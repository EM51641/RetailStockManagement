import { v4 } from "uuid";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { UserUnitOfWork } from "../../Units/User/UnitOfWorkUser";
import { User } from "../../Domains/User";
import { Strategy } from "passport-local";

export type UserRegistrationDTO = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_id: string;
  is_admin: boolean;
  is_active: boolean;
};

@Injectable()
export class UserRegistrationService {
  constructor(private readonly unit_of_work: UserUnitOfWork) {}
  async register_user(form: UserRegistrationDTO) {
    const id = v4();
    const current_date = new Date();
    const user = new User(
      id,
      form.first_name,
      form.last_name,
      form.is_active,
      form.is_admin,
      current_date,
      form.company_id,
      form.email,
      form.password,
    );
    await this.unit_of_work.user_repository.add(user);
    await this.unit_of_work.save();
    return {
      id: user.Id,
      first_name: user.first_name,
      last_name: user.last_name,
      is_active: user.is_active,
      is_admin: user.is_admin,
      created_at: user.createdAt,
      company_id: user.company_id,
      email: user.email,
    };
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly unit_of_work: UserUnitOfWork) {
    super();
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.unit_of_work.user_repository.find_by_email(email);
    const passwordValid = await user.check_password(password);
    if (user && passwordValid) {
      return user;
    } else {
      throw new NotAcceptableException("could not find the user");
    }
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
