import {
  Plan,
  CountPlan,
  CountExecution,
  CountSubProduct,
} from "../Domains/CountPlan";
import { CountExecutionMapper } from "../helpers/Mappers/CountExecution";
import { CountPlanMapper } from "../helpers/Mappers/CountPlan";
import { CountSubProductMapper } from "../helpers/Mappers/CountSubproduct";
import { PlanMapper } from "../helpers/Mappers/Plan";
import {
  PlanEntity,
  CountPlanEntity,
  CountExecutionEntity,
  CountSubProductEntity,
} from "../Models/CountPlan";
import { SessionManager } from "../Session/Session";
import { BaseRepository } from "./Base";

interface PlanRepositoryInterface {}
interface UserPlanRepositoryInterface {}
interface CountExecutionRepositoryInterface {}
interface ICountSubproductRepository {}

export class PlanRepository
  extends BaseRepository<PlanEntity, Plan>
  implements PlanRepositoryInterface
{
  constructor(session: SessionManager) {
    const plan_mapper = new PlanMapper();
    super(session, PlanEntity, plan_mapper);
  }
}

export class CountPlanRepository
  extends BaseRepository<CountPlanEntity, CountPlan>
  implements UserPlanRepositoryInterface
{
  constructor(session: SessionManager) {
    const count_plan_mapper = new CountPlanMapper();
    super(session, CountPlanEntity, count_plan_mapper);
  }
}

export class CountExecutionRepository
  extends BaseRepository<CountExecutionEntity, CountExecution>
  implements CountExecutionRepositoryInterface
{
  constructor(session: SessionManager) {
    const count_execution_mapper = new CountExecutionMapper();
    super(session, CountExecutionEntity, count_execution_mapper);
  }
}

export class CountSubproductRepository
  extends BaseRepository<CountSubProductEntity, CountSubProduct>
  implements ICountSubproductRepository
{
  constructor(session: SessionManager) {
    const count_subproduct_mapper = new CountSubProductMapper();
    super(session, CountSubProductEntity, count_subproduct_mapper);
  }
}
