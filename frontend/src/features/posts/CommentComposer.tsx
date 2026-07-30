import { FormEvent, useState } from 'react';
import { ApiError, api } from '../../lib/api';

type CommentComposerProps = {
  accessToken: string;
  authorId: string;
  fatherPostId: string;
  onCreated?: () => void;
};

export function CommentComposer({ accessToken, authorId, fatherPostId, onCreated }: CommentComposerProps) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('Escreva um comentário.');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Criando comentário...');

    try {
      await api.createPost(
        {
          title: '',
          content,
          authorId,
          uppoints: 0,
          downpoints: 0,
          father_post_id: fatherPostId,
        },
        accessToken,
      );

      setContent('');
      setMessage('Comentário criado com sucesso.');
      onCreated?.();
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <label>
        Comentário
        <textarea value={content} onChange={(event) => setContent(event.target.value)} required />
      </label>
      <button type="submit">Comentar</button>
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

  return 'Erro inesperado ao criar comentário.';
}
