import { randomUUID } from 'node:crypto';
import { Replace } from '../../../utils/replace.js';

export interface PostSchema {
  title: string;
  content: string;
  authorId: string;
  uppoints: number;
  downpoints: number;
  father_post_id: string | null;
  createdAt?: Date;
  img_url?: string;
}

export class Post {
  private _id: string;
  private props: PostSchema;

  constructor(
    props: Replace<
      PostSchema,
      {
        id?: string;
        uppoints?: number;
        downpoints?: number;
        createdAt?: Date;
        father_post_id?: string | null;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      father_post_id: props.father_post_id ?? null,
      uppoints: props.uppoints ?? 0,
      downpoints: props.downpoints ?? 0,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  static reconstitute(props: PostSchema, post_id: string): Post {
    return new Post(props, post_id);
  }

  get get_props(): PostSchema {
    return this.props;
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

  set set_father_post_id(father_post_id: string | null) {
    this.props.father_post_id = father_post_id;
  }

  get get_father_post_id(): string | null {
    return this.props.father_post_id;
  }

  set set_img_url(url: string | undefined) {
    this.props.img_url = url;
  }

  get get_img_url(): string | undefined {
    return this.props.img_url;
  }
}