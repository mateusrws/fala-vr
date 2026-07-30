import { FormEvent, useState } from 'react';
import { ApiError, api } from '../../lib/api';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [message, setMessage] = useState('Preencha os dados para criar uma conta comum.');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Cadastrando usuário...');

    try {
      await api.createUser({
        name,
        email,
        password,
        img_url: imgUrl,
        role: 'USER',
      });

      setName('');
      setEmail('');
      setPassword('');
      setImgUrl('');
      setMessage('Usuário cadastrado com sucesso.');
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <label>
        Nome
        <input value={name} onChange={(event) => setName(event.target.value)} type="text" required />
      </label>
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
      <label>
        URL da imagem
        <input value={imgUrl} onChange={(event) => setImgUrl(event.target.value)} type="url" />
      </label>
      <button type="submit">Cadastrar</button>
      <p className="status">{message}</p>
    </form>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return `Erro ${error.status}: ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro inesperado ao cadastrar usuário.';
}
