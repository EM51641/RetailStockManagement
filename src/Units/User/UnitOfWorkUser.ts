import { Injectable, Scope } from "@nestjs/common";
import { UserRepository } from "../../Repositories/User";
import { UnitOfWork } from "../Base";

interface IUserUnitOfWork {
  get user_repository(): UserRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class UserUnitOfWork extends UnitOfWork implements IUserUnitOfWork {
  private readonly _user_repository: UserRepository = new UserRepository(
    this.context,
  );

  get user_repository(): UserRepository {
    return this._user_repository;
  }
}
