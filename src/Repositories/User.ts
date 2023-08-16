import { Admin, User } from "../Domains/User";
import { AdminMapper } from "../helpers/Mappers/Admin";
import { UserMapper } from "../helpers/Mappers/User";
import { AdminEntity, UserEntity } from "../Models/User";
import { SessionManager } from "../Session/Session";
import { BaseRepository, BaseRepositoryInterface } from "./Base";

interface UserRepositoryInterface
  extends BaseRepositoryInterface<UserEntity, User> {}

interface IAdminRepository extends BaseRepositoryInterface<AdminEntity, Admin> {
  get_admin_by_user_id(user_id: string): Promise<Admin>;
}

export class UserRepository
  extends BaseRepository<UserEntity, User>
  implements UserRepositoryInterface
{
  constructor(session: SessionManager) {
    const user_mapper = new UserMapper();
    super(session, UserEntity, user_mapper);
  }
}

export class AdminRepository
  extends BaseRepository<AdminEntity, Admin>
  implements IAdminRepository
{
  constructor(session: SessionManager) {
    const admin_mapper = new AdminMapper();
    super(session, AdminEntity, admin_mapper);
  }
  async get_admin_by_user_id(user_id: string): Promise<Admin> {
    const record = await this._FindFirst({ where: { user_id: user_id } });
    const admin = this._mapper.GetDomainFromEntity(record);
    return admin;
  }
}
