import { Post, PostSchema } from "../entities/Post.js"
import { randomUUID } from "node:crypto"

type Override = Partial<PostSchema>

export const makePost = (override: Override = {}) => {

    const data: PostSchema = {
        title: "Default Title",
        content: "Default Content",
        authorId: "default-author-id",
        createdAt: new Date(),
        uppoints: 0,
        downpoints: 0,
        father_post_id: randomUUID()
    }
    return new Post({
        ...data
    })
}