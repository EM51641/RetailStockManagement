import { v4, } from "uuid";
import { CountSubProduct } from "../../Domains/CountPlan";
import { User } from "../../Domains/User";
import { CountExcecutionStatus } from "../../Models/CountPlan";
import {
  CountSubproductRepository,
  CountPlanRepository,
} from "../../Repositories/CountPlan";
import { ProductRepository, SubProductRepository } from "../../Repositories/Product";
import { AdminRepository, UserRepository } from "../../Repositories/User";
import { UnitOfWork } from "../../Units/Base";
import { BaseService } from "../Base";

type CountSubproductDTO = {
  subproduct_id: string;
  count_execution_id: string;
  user_id: string;
  quanity: number;
};

interface ICountSubproductService {
  update_quantity(): Promise<void>;
  get count_execution_repository(): CountSubproductRepository;
  get count_plan_repository(): CountPlanRepository;
  get product_repository(): ProductRepository;
  get subproduct_repository(): SubProductRepository;
  get user_repository(): UserRepository;
}

export class CountSubproductService
  extends BaseService
  implements ICountSubproductService
{
  private _count_execution_repository: CountSubproductRepository;
  private _product_repository: ProductRepository;
  private _subproduct_repository: SubProductRepository;
  private _user_repository: UserRepository;
  private _count_plan_repository: CountPlanRepository;

  constructor(
    unit_of_work: UnitOfWork,
    private _data: CountSubproductDTO,
  ) {
    super(unit_of_work);
    this._count_execution_repository = new CountSubproductRepository(
      this.unit_of_work.context,
    );
    this._count_plan_repository = new CountPlanRepository(
      this.unit_of_work.context,
    );
    this._user_repository = new UserRepository(this.unit_of_work.context);
    this._product_repository = new ProductRepository(this.unit_of_work.context);
    this._subproduct_repository = new SubProductRepository(
      this.unit_of_work.context,
    );
  }

  get count_execution_repository(): CountSubproductRepository {
    return this._count_execution_repository;
  }

  get user_repository(): UserRepository {
    return this._user_repository;
  }

  get product_repository(): ProductRepository {
    return this._product_repository;
  }

  get subproduct_repository(): SubProductRepository {
    return this._subproduct_repository;
  }

  get count_plan_repository(): CountPlanRepository {
    return this._count_plan_repository;
  }

  async update_quantity(): Promise<void> {
    await this.is_user_authorized();
    const count_execution = new CountSubproduct(
      id,
      this._data.plan_id,
      this._data.status,
    );
    await this._count_execution_repository.add(count_execution);
    await this.unit_of_work.save();
  }

  private async add_subproduct(): Promis<void> {
  }

  private async is_access_to_plan_authorized: Promise<void> {
    const user = await this._user_repository.FindById(this._data.user_id);
    const count_execution = await this._count_execution_repository.FindById(this._data.plan_id);
  }

  private async is_admin_in_company(user: User): Promise<void> {
    const plan = await this._count_plan_repository.FindById(this._data.plan_id);
    if (plan.company_id != user.company_id) {
      throw new Error("User is not authorized");
    }
  }
}
