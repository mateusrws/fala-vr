import { FormEvent, useState } from 'react';
import { ApiError, api } from '../../lib/api';

type PostComposerProps = {
  accessToken: string;
  authorId: string;
  onCreated?: () => void;
};

export function PostComposer({ accessToken, authorId, onCreated }: PostComposerProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('Crie uma postagem principal.');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('Criando postagem...');

    try {
      const post = await api.createPost(
        {
          title,
          content,
          authorId,
          uppoints: 0,
          downpoints: 0,
          father_post_id: null,
        },
        accessToken,
      );

      if (image) {
        await api.uploadPostImage(post.id, image, accessToken);
      }

      setTitle('');
      setContent('');
      setImage(null);
      event.currentTarget.reset();
      setMessage('Postagem criada com sucesso.');
      onCreated?.();
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <label>
        Título
        <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" required />
      </label>
      <label>
        Conteúdo
        <textarea value={content} onChange={(event) => setContent(event.target.value)} required />
      </label>
      <label>
        Imagem opcional
        <input
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          type="file"
          accept="image/*"
        />
      </label>
      <button type="submit">Publicar</button>
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

  return 'Erro inesperado ao criar postagem.';
}
