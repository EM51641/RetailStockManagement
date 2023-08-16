import { Plan } from "../../Domains/CountPlan";
import { PlanEntity } from "../../Models/CountPlan";
import { IMapper } from "./Base";

export class PlanMapper implements IMapper<PlanEntity, Plan> {
  GetEntityFromDomain(plan: Plan) {
    let record = new PlanEntity();
    record.id = plan.Id;
    record.name = plan.name;
    record.price = plan.price;
    return record;
  }

  GetDomainFromEntity(plan_entity: PlanEntity) {
    const plan = new Plan(plan_entity.id, plan_entity.price, plan_entity.name);
    return plan;
  }

  TransferDomainToEntity(record: PlanEntity, plan: Plan) {
    record.name = plan.name;
    record.price = plan.price;
  }
}
