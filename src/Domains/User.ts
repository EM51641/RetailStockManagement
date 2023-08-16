import { assert } from "console";
import { DomainBase } from "./Base";
import bcrypt from "bcrypt";

const SALT = 10;

export class Company extends DomainBase {
  constructor(
    uid: string,
    private _name: string,
  ) {
    super(uid);
  }

  get name() {
    return this._name;
  }
}

export class User extends DomainBase {
  constructor(
    uid: string,
    private _firstName: string,
    private _lastName: string,
    private _is_active: boolean,
    private _is_admin: boolean,
    private _created_at: Date,
    private _company_id: string,
    private _email: string,
    private _password?: string,
  ) {
    super(uid);
  }

  get first_name() {
    return this._firstName;
  }

  get last_name() {
    return this._lastName;
  }

  get is_active() {
    return this._is_active;
  }

  get createdAt() {
    return this._created_at;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get is_admin() {
    return this._is_admin;
  }

  get company_id() {
    return this._company_id;
  }

  set_email(value: string) {
    // We can pass the value through
    // a validation object
    this._email = value;
  }

  async set_password(value: string) {
    // We should encrypt this using a salt

    const hash = await bcrypt.hash(value, SALT);
    this._password = hash;
  }

  check_password(value: string) {
    if (!this._password) {
      throw new Error("No Password Exists");
    }
    const valid_password = bcrypt.compare(value, this._password);
    return valid_password;
  }
}
