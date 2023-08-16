import { Injectable, Scope } from "@nestjs/common";
import { UserRepository } from "../../Repositories/User";
import { UnitOfWork } from "../Base";
import { CompanyRepository } from "../../Repositories/Company";

interface IUserUnitOfWork {
  get user_repository(): UserRepository;
  get company_repository(): CompanyRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class UserUnitOfWork extends UnitOfWork implements IUserUnitOfWork {
  private readonly _user_repository: UserRepository = new UserRepository(
    this.context,
  );

  private readonly _company_repository: CompanyRepository =
    new CompanyRepository(this.context);

  get user_repository(): UserRepository {
    return this._user_repository;
  }

  get company_repository(): CompanyRepository {
    return this._company_repository;
  }
}
