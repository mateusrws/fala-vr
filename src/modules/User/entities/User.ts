import { Roles } from "../types/Roles";
import { randomUUID } from "crypto";
import { hashSync } from "bcrypt"

export interface UserSchema{ 
    name: string;
    email: string;
    password: string;
    role: Roles
}

export class User {
    private _id;
    private props;

    constructor(props: UserSchema){
        this.props = props;
        this._id = randomUUID();
    }

    get get_id() : string{
        return this._id;
    }
    
    get get_name() : string{
        return this.props.name;
    }
    set set_name(name: string){
        this.props.name = name;
    }

    get get_email() : string{
        return this.props.email;
    }

    set set_email(email: string){
        this.props.email = email;
    }

    get get_password() : string{
        return this.props.password;
    }

    set set_password(text: string){
        this.props.password = hashSync(text, 10);
    }

    get get_role() : Roles{
        return this.props.role;
    }

    set set_role(role: Roles){
        this.props.role = role;
    }
}