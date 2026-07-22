// model Post {
//     id              String   @id @default(uuid())
//     title           String
//     content         String
//     authorId        String
//     createdAt       DateTime @default(now())
//     uppoints        Int      @default(0)
//     downpoints      Int      @default(0)
//     father_post_id  String?  @map("father_post_id")
//     father_post     Post?    @relation("PostToPost", fields:         [father_post_id], references: [id])
//     author          User     @relation(fields: [authorId], references: [id])
//     child_posts     Post[]   @relation("PostToPost")
//     @@index([father_post_id], name: "father_post_id")
// }

import { randomUUID } from "node:crypto";
import { Replace } from "../../../utils/replace.js";

export interface PostSchema{
    title: string;
    content: string;
    authorId: string;
    uppoints: number;
    downpoints: number;
    father_post_id: string;
    createdAt?: Date;
}

export class Post {
  private _id: string;
  private props: PostSchema;

    constructor(props: Replace<PostSchema, { id?: string, uppoints?: number, downpoints?: number, createdAt?: Date }>, id?: string) {
        this._id = id || randomUUID();
        this.props = {
            ...props,
            uppoints: props.uppoints ?? 0,
            downpoints: props.downpoints ?? 0,
            createdAt: props.createdAt ?? new Date()
        };
    }

    static reconstitute(props: PostSchema, user_id: string): Post {
        const post = new Post({ ...props }, user_id);
        return post;
    }

    get get_props(): PostSchema{
        return this.props
    }

    get get_id(): string {
        return this._id;
    }
    set set_title(title: string) {
        this.props.title = title;
    }
    get get_title(): string {
        return this.props.title;
    }
    set set_content(content: string) {
        this.props.content = content;
    }
    get get_content(): string {
        return this.props.content;
    }
    set set_authorId(authorId: string) {
        this.props.authorId = authorId;
    }
    get get_authorId(): string {
        return this.props.authorId;
    }
    get get_createdAt(): Date | undefined {
        return this.props.createdAt;
    }
    set set_uppoints(uppoints: number) {
        this.props.uppoints = uppoints;
    }
    get get_uppoints(): number {
        return this.props.uppoints;
    }
    set set_downpoints(downpoints: number) {
        this.props.downpoints = downpoints;
    }
    get get_downpoints(): number {
        return this.props.downpoints;
    }
    set set_father_post_id(father_post_id: string) {
        this.props.father_post_id = father_post_id;
    }
    get get_father_post_id(): string {
        return this.props.father_post_id;
    }
}