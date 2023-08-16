import { CountPlan } from "../../Domains/CountPlan";
import { CountPlanEntity } from "../../Models/CountPlan";
import { IMapper } from "./Base";

export class CountPlanMapper implements IMapper<CountPlanEntity, CountPlan> {
  GetEntityFromDomain(user_plan: CountPlan) {
    let record = new CountPlanEntity();
    record.id = user_plan.Id;
    record.company_id = user_plan.company_id;
    record.expiration = user_plan.expiration;
    return record;
  }

  GetDomainFromEntity(user_plan_entity: CountPlanEntity) {
    const user_plan = new CountPlan(
      user_plan_entity.id,
      user_plan_entity.company_id,
      user_plan_entity.expiration,
    );
    return user_plan;
  }

  TransferDomainToEntity(record: CountPlanEntity, user_plan: CountPlan) {
    record.company_id = user_plan.company_id;
    record.expiration = user_plan.expiration;
  }
}
