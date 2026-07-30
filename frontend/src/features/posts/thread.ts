import { Post } from '../../lib/api';

export type PostWithChildren = Post & {
  child_posts: PostWithChildren[];
};

function hasFatherPostId(post: Post) {
  return typeof post.father_post_id === 'string' && post.father_post_id.trim().length > 0;
}

export function groupPostsByFatherPostId(posts: Post[]): PostWithChildren[] {
  const postsById = new Map<string, PostWithChildren>();
  const rootPosts: PostWithChildren[] = [];

  for (const post of posts) {
    postsById.set(post.id, { ...post, child_posts: [] });
  }

  for (const post of postsById.values()) {
    if (!hasFatherPostId(post)) {
      rootPosts.push(post);
      continue;
    }

    const fatherPostId = post.father_post_id;
    const fatherPost = fatherPostId ? postsById.get(fatherPostId) : undefined;

    if (fatherPost) {
      fatherPost.child_posts.push(post);
      continue;
    }

    rootPosts.push(post);
  }

  return rootPosts;
}
