import { CountExecution } from "../../Domains/CountPlan";
import { CountExecutionEntity } from "../../Models/CountPlan";
import { IMapper } from "./Base";

export class CountExecutionMapper
  implements IMapper<CountExecutionEntity, CountExecution>
{
  GetEntityFromDomain(user_plan: CountExecution) {
    let record = new CountExecutionEntity();
    record.id = user_plan.Id;
    record.plan_id = user_plan.plan_id;
    record.status = user_plan.status;
    return record;
  }

  GetDomainFromEntity(count_execution_entity: CountExecutionEntity) {
    const user_plan = new CountExecution(
      count_execution_entity.id,
      count_execution_entity.plan_id,
      count_execution_entity.status,
    );
    return user_plan;
  }

  TransferDomainToEntity(
    record: CountExecutionEntity,
    count_execution: CountExecution,
  ) {
    record.plan_id = count_execution.plan_id;
    record.status = count_execution.status;
  }
}
