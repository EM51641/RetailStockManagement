import { Injectable, Scope } from "@nestjs/common";
import { CompanyRepository } from "../../Repositories/Company";
import { CountPlanRepository } from "../../Repositories/CountPlan";
import { UnitOfWork } from "../Base";

interface ICountPlanUnitOfWork {
  get count_plan_repository(): CountPlanRepository;
  get company_repository(): CompanyRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class CountPlanUnitOfWork
  extends UnitOfWork
  implements ICountPlanUnitOfWork
{
  private readonly _company_repository: CompanyRepository =
    new CompanyRepository(this.context);
  private readonly _count_plan_repository: CountPlanRepository =
    new CountPlanRepository(this.context);

  get company_repository(): CompanyRepository {
    return this._company_repository;
  }
  get count_plan_repository(): CountPlanRepository {
    return this._count_plan_repository;
  }
}
