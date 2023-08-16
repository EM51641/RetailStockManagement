import { Injectable, Scope } from "@nestjs/common";
import {
  CountExecutionRepository,
  CountPlanRepository,
} from "../../Repositories/CountPlan";
import { UnitOfWork } from "../Base";

interface ICountExecutionUnitOfWork {
  get count_execution_repository(): CountExecutionRepository;
  get count_plan_repository(): CountPlanRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class CountExecutionUnitOfWork
  extends UnitOfWork
  implements ICountExecutionUnitOfWork
{
  private readonly _count_plan_repository: CountPlanRepository =
    new CountPlanRepository(this.context);
  private readonly _count_execution_repository: CountExecutionRepository =
    new CountExecutionRepository(this.context);

  get count_plan_repository(): CountPlanRepository {
    return this._count_plan_repository;
  }
  get count_execution_repository(): CountExecutionRepository {
    return this._count_execution_repository;
  }
}
