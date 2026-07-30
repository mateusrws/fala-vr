import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

const ACCESS_TOKEN_STORAGE_KEY = 'fala-vr.access_token';

type JwtPayload = {
  sub?: string;
  user_id?: string;
  id?: string;
};

type AuthContextValue = {
  accessToken: string;
  userId?: string;
  signInWithToken: (accessToken: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? '');

  const userId = useMemo(() => decodeUserId(accessToken), [accessToken]);

  function signInWithToken(nextAccessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, nextAccessToken);
    setAccessToken(nextAccessToken);
  }

  function signOut() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    setAccessToken('');
  }

  const value = useMemo(
    () => ({ accessToken, userId, signInWithToken, signOut }),
    [accessToken, userId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

function decodeUserId(accessToken: string) {
  if (!accessToken) {
    return undefined;
  }

  const [, payload] = accessToken.split('.');
  if (!payload) {
    return undefined;
  }

  try {
    const decodedPayload = JSON.parse(atob(toBase64(payload))) as JwtPayload;
    return decodedPayload.sub ?? decodedPayload.user_id ?? decodedPayload.id;
  } catch {
    return undefined;
  }
}

function toBase64(base64Url: string) {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
}
