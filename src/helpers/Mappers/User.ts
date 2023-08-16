import { User } from "../../Domains/User";
import { UserEntity } from "../../Models/User";
import { IMapper } from "./Base";

export class UserMapper implements IMapper<UserEntity, User> {
  GetEntityFromDomain(user: User): UserEntity {
    const record = new UserEntity();
    record.id = user.Id;
    record.firstName = user.first_name;
    record.lastName = user.last_name;
    record.is_active = user.is_active;
    record.is_admin = user.is_admin;
    record.created_at = user.createdAt;
    record.company_id = user.company_id;
    record.email = user.email;
    record.password = user.password;
    return record;
  }

  GetDomainFromEntity(user_entity: UserEntity): User {
    const user = new User(
      user_entity.id,
      user_entity.firstName,
      user_entity.lastName,
      user_entity.is_active,
      user_entity.is_admin,
      user_entity.created_at,
      user_entity.company_id,
      user_entity.email,
      user_entity.password,
    );
    return user;
  }

  TransferDomainToEntity(record: UserEntity, user: User): void {
    record.firstName = user.first_name;
    record.lastName = user.last_name;
    record.created_at = user.createdAt;
    record.email = user.email;
    record.is_active = user.is_active;
    record.is_admin = user.is_admin;
    record.company_id = user.company_id;
    record.password = user.password;
  }
}
