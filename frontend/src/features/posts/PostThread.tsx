import { CommentComposer } from './CommentComposer';
import { PostWithChildren, groupPostsByFatherPostId } from './thread';
import { Post } from '../../lib/api';

type PostThreadProps = {
  accessToken: string;
  authorId: string;
  posts: Post[];
  onReplyCreated?: () => void;
};

type PostNodeProps = {
  accessToken: string;
  authorId: string;
  post: PostWithChildren;
  onReplyCreated?: () => void;
};

export function PostThread({ accessToken, authorId, posts, onReplyCreated }: PostThreadProps) {
  const postTree = groupPostsByFatherPostId(posts);

  if (postTree.length === 0) {
    return <p className="status">Nenhum post carregado.</p>;
  }

  return (
    <ul className="post-thread">
      {postTree.map((post) => (
        <PostNode
          key={post.id}
          accessToken={accessToken}
          authorId={authorId}
          post={post}
          onReplyCreated={onReplyCreated}
        />
      ))}
    </ul>
  );
}

function PostNode({ accessToken, authorId, post, onReplyCreated }: PostNodeProps) {
  return (
    <li className="post-thread-item">
      <article className="post-card">
        {post.title ? <strong>{post.title}</strong> : null}
        <span>{post.content}</span>
        <CommentComposer
          accessToken={accessToken}
          authorId={authorId}
          fatherPostId={post.id}
          onCreated={onReplyCreated}
        />
      </article>

      {post.child_posts.length > 0 ? (
        <ul className="post-thread post-thread-children">
          {post.child_posts.map((childPost) => (
            <PostNode
              key={childPost.id}
              accessToken={accessToken}
              authorId={authorId}
              post={childPost}
              onReplyCreated={onReplyCreated}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
