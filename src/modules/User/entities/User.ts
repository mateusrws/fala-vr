import { randomUUID } from 'crypto';
import { hashSync } from 'bcrypt';
import { Role } from '../types/Roles.enum.js';
import { Replace } from '../../../utils/replace.js';

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  img_url: string;
  role: Role;
  createdAt?: Date;
}

export class User {
  private _id: string;
  props: UserSchema;

  constructor(
    props: Replace<UserSchema, { img_url?: string; createdAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      password: hashSync(props.password, 10),
      img_url: props.img_url ?? '',
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  static reconstitute(props: UserSchema, user_id: string): User {
    const user = new User({ ...props, password: '_placeholder_' }, user_id);
    user.props.password = props.password;
    return user;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get get_id(): string {
    return this._id;
  }

  get get_name(): string {
    return this.props.name;
  }
  set set_name(name: string) {
    this.props.name = name;
  }

  get get_img_url(): string {
    return this.props.img_url;
  }
  set set_img_url(url: string) {
    this.props.img_url = url;
  }

  get get_email(): string {
    return this.props.email;
  }

  set set_email(email: string) {
    this.props.email = email;
  }

  get get_password(): string {
    return this.props.password;
  }

  set set_password(text: string) {
    this.props.password = hashSync(text, 10);
  }

  get get_role(): Role {
    return this.props.role;
  }

  set set_role(role: Role) {
    this.props.role = role;
  }
}
