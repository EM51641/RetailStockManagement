import { Injectable, Scope } from "@nestjs/common";
import {
  CountExecutionRepository,
  CountSubproductRepository,
} from "../../Repositories/CountPlan";
import { SubProductRepository } from "../../Repositories/Product";
import { UnitOfWork } from "../Base";

interface ICountUserSubProductUnitOfWork {
  get count_subproduct_repository(): CountSubproductRepository;
  get count_execution_repository(): CountExecutionRepository;
  get subproduct_repository(): SubProductRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class CountUserSubProductUnitOfWork
  extends UnitOfWork
  implements ICountUserSubProductUnitOfWork
{
  private readonly _subproduct_repository: SubProductRepository =
    new SubProductRepository(this.context);
  private readonly _count_execution_repository: CountExecutionRepository =
    new CountExecutionRepository(this.context);
  private readonly _count_subproduct_repository: CountSubproductRepository =
    new CountSubproductRepository(this.context);

  get subproduct_repository(): SubProductRepository {
    return this._subproduct_repository;
  }
  get count_execution_repository(): CountExecutionRepository {
    return this._count_execution_repository;
  }
  get count_subproduct_repository(): CountSubproductRepository {
    return this._count_subproduct_repository;
  }
}
