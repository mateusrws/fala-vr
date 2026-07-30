import { FormEvent, useState } from 'react';
import { ApiError, Post, api } from './lib/api';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState('Informe suas credenciais para acessar as rotas protegidas.');

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Entrando...');

    try {
      const response = await api.signIn({ email, password });
      setAccessToken(response.access_token);
      setMessage('Login realizado. O token será enviado como Bearer nas chamadas protegidas.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  }

  async function handleLoadPosts() {
    if (!accessToken) {
      setMessage('Faça login antes de carregar posts.');
      return;
    }

    setMessage('Carregando posts...');

    try {
      const response = await api.getPosts(accessToken);
      setPosts(response);
      setMessage(`${response.length} post(s) carregado(s).`);
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Fala VR • Frontend</p>
        <h1>Cliente React para o backend NestJS</h1>
        <p>
          Stack confirmada: Vite + React + TypeScript, consumindo a API configurada por{' '}
          <code>VITE_API_URL</code>.
        </p>
      </section>

      <section className="panel">
        <h2>Login</h2>
        <form onSubmit={handleSignIn} className="form-grid">
          <label>
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Senha
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>
          <button type="submit">Entrar</button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Posts</h2>
          <button type="button" onClick={handleLoadPosts}>Carregar posts</button>
        </div>
        <p className="status">{message}</p>
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <span>{post.content}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return `Erro ${error.status}: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro inesperado ao chamar a API.';
}
