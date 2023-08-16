import { AdminRole } from "../Models/User";
import { DomainBase } from "./Base";

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
    private _created_at: Date,
    private _company_id: string,
    private _email?: string,
    private _password?: string,
  ) {
    super(uid);
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get isActive() {
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

  get company_id() {
    return this._company_id;
  }

  SetEmail(value: string) {
    // We can pass the value through
    // a validation object
    this._email = value;
  }

  SetPassword(value: string) {
    // We should encrypt this using a salt
    this._password = value;
  }

  VerifyPassword(value: string) {
    if (this._password === value) {
      return true;
    }
    return false;
  }
}

export class Admin extends DomainBase {
  private _user_id: string;
  private _role: AdminRole;

  constructor(uid: string, user_id: string, role: AdminRole) {
    super(uid);
    this._user_id = user_id;
    this._role = role;
  }

  get user_id() {
    return this._user_id;
  }

  get role() {
    return this._role;
  }
}

export class Customer extends DomainBase {
  private _user_id: string;

  constructor(id: string, user_id: string) {
    super(id);
    this._user_id = user_id;
  }

  get user_id() {
    return this._user_id;
  }
}
