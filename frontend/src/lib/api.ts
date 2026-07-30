const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
};

export type UserPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
  img_url?: string;
};

export type User = Omit<UserPayload, 'password'> & {
  id: string;
  password?: string;
};

export type PostPayload = {
  title: string;
  content: string;
  authorId: string;
  uppoints: number;
  downpoints: number;
  father_post_id?: string | null;
};

export type Post = PostPayload & {
  id: string;
  createdAt: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  accessToken?: string;
  body?: BodyInit | Record<string, unknown>;
  headers?: HeadersInit;
};

function buildUrl(path: string) {
  return `${API_URL.replace(/\/$/, '')}${path}`;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { accessToken, body, headers, ...init } = options;
  const requestHeaders = new Headers(headers);

  let requestBody: BodyInit | undefined;
  if (body instanceof FormData || body instanceof Blob) {
    requestBody = body;
  }
  if (body && !(body instanceof FormData) && !(body instanceof Blob)) {
    requestHeaders.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(body);
  }

  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers: requestHeaders,
    body: requestBody,
  });

  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(response.statusText || 'API request failed', response.status, data);
  }

  return data as T;
}

export const api = {
  signIn(credentials: SignInCredentials) {
    return request<SignInResponse>('/signin', {
      method: 'POST',
      body: credentials,
    });
  },

  createUser(user: UserPayload) {
    return request<User>('/user', {
      method: 'POST',
      body: user,
    });
  },

  getUsers(accessToken: string) {
    return request<User[]>('/user', { accessToken });
  },

  getUser(userId: string, accessToken: string) {
    return request<User>(`/user/${userId}`, { accessToken });
  },

  updateUser(userId: string, user: UserPayload, accessToken: string) {
    return request<User>(`/user/${userId}`, {
      method: 'PUT',
      body: user,
      accessToken,
    });
  },

  deleteUser(userId: string, accessToken: string) {
    return request<void>(`/user/${userId}`, {
      method: 'DELETE',
      accessToken,
    });
  },

  getPosts(accessToken: string) {
    return request<Post[]>('/posts', { accessToken });
  },

  createPost(post: PostPayload, accessToken: string) {
    return request<Post>('/posts', {
      method: 'POST',
      body: post,
      accessToken,
    });
  },

  getPost(postId: string, accessToken: string) {
    return request<Post>(`/posts/${postId}`, { accessToken });
  },

  updatePost(postId: string, post: PostPayload, accessToken: string) {
    return request<Post>(`/posts/${postId}`, {
      method: 'PUT',
      body: post,
      accessToken,
    });
  },

  deletePost(postId: string, accessToken: string) {
    return request<void>(`/posts/${postId}`, {
      method: 'DELETE',
      accessToken,
    });
  },

  uploadUserProfileImage(file: File, accessToken: string) {
    const formData = new FormData();
    formData.append('file', file);

    return request<User>('/user', {
      method: 'PATCH',
      body: formData,
      accessToken,
    });
  },

  uploadPostImage(postId: string, file: File, accessToken: string) {
    const formData = new FormData();
    formData.append('file', file);

    return request<Post>(`/posts/${postId}`, {
      method: 'PATCH',
      body: formData,
      accessToken,
    });
  },
};
