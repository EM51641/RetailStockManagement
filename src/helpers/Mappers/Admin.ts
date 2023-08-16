import { Admin } from "../../Domains/User";
import { AdminEntity } from "../../Models/User";
import { IMapper } from "./Base";

export class AdminMapper implements IMapper<AdminEntity, Admin> {
  GetEntityFromDomain(admin: Admin): AdminEntity {
    let record = new AdminEntity();
    record.id = admin.Id;
    record.role = admin.role;
    record.user_id = admin.user_id;
    return record;
  }
  GetDomainFromEntity(admin_entity: AdminEntity): Admin {
    const admin = new Admin(
      admin_entity.id,
      admin_entity.user_id,
      admin_entity.role,
    );
    return admin;
  }
  TransferDomainToEntity(record: AdminEntity, admin: Admin): void {
    record.role = admin.role;
    record.user_id = admin.user_id;
  }
}
