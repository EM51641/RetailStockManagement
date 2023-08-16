import { User } from "../Domains/User";
import { UserMapper } from "../helpers/Mappers/User";
import { UserEntity } from "../Models/User";
import { SessionManager } from "../Session/Session";
import { BaseRepository, BaseRepositoryInterface } from "./Base";

interface UserRepositoryInterface
  extends BaseRepositoryInterface<UserEntity, User> {
  find_by_email(email: string): Promise<User>;
}

export class UserRepository
  extends BaseRepository<UserEntity, User>
  implements UserRepositoryInterface
{
  constructor(session: SessionManager) {
    const user_mapper = new UserMapper();
    super(session, UserEntity, user_mapper);
  }

  async find_by_email(email: string): Promise<User> {
    const user_entity = await this._FindFirst({ where: { email: email } });
    const user = this._mapper.GetDomainFromEntity(user_entity);
    return user;
  }
}
