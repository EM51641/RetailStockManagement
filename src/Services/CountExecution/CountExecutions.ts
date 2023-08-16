import { v4 } from "uuid";
import { CountExecution } from "../../Domains/CountPlan";
import { User } from "../../Domains/User";
import { CountExcecutionStatus } from "../../Models/CountPlan";
import {
  CountExecutionRepository,
  CountPlanRepository,
} from "../../Repositories/CountPlan";
import { AdminRepository, UserRepository } from "../../Repositories/User";
import { UnitOfWork } from "../../Units/Base";
import { BaseService } from "../Base";

type CreateCountExecutionDTO = {
  plan_id: string;
  user_id: string;
  status: CountExcecutionStatus;
};

interface ICountExecutionService {
  add_count_execution(): Promise<void>;
  get count_execution_repository(): CountExecutionRepository;
  get user_repository(): UserRepository;
  get admin_repository(): AdminRepository;
  get count_plan_repository(): CountPlanRepository;
}

export class CountExecutionService
  extends BaseService
  implements ICountExecutionService
{
  private _count_execution_repository: CountExecutionRepository;
  private _user_repository: UserRepository;
  private _admin_repository: AdminRepository;
  private _count_plan_repository: CountPlanRepository;

  constructor(
    unit_of_work: UnitOfWork,
    private _data: CreateCountExecutionDTO,
  ) {
    super(unit_of_work);
    this._count_execution_repository = new CountExecutionRepository(
      this.unit_of_work.context,
    );
    this._count_plan_repository = new CountPlanRepository(
      this.unit_of_work.context,
    );
    this._user_repository = new UserRepository(this.unit_of_work.context);
    this._admin_repository = new AdminRepository(this.unit_of_work.context);
  }

  get count_execution_repository(): CountExecutionRepository {
    return this._count_execution_repository;
  }

  get user_repository(): UserRepository {
    return this._user_repository;
  }

  get admin_repository(): AdminRepository {
    return this._admin_repository;
  }

  get count_plan_repository(): CountPlanRepository {
    return this._count_plan_repository;
  }

  async add_count_execution(): Promise<void> {
    await this.is_user_authorized();
    const id = v4();
    const count_execution = new CountExecution(
      id,
      this._data.plan_id,
      this._data.status,
    );
    await this._count_execution_repository.add(count_execution);
    await this.unit_of_work.save();
  }

  private async is_user_authorized(): Promise<void> {
    const user = await this._user_repository.FindById(this._data.user_id);
    await this.is_user_admin(user);
    await this.is_admin_in_company(user);
  }

  private async is_user_admin(user: User) {
    try {
      await this._admin_repository.get_admin_by_user_id(user.Id);
    } catch (e) {
      throw new Error("Only admins are authorized");
    }
  }

  private async is_admin_in_company(user: User): Promise<void> {
    const plan = await this._count_plan_repository.FindById(this._data.plan_id);
    if (plan.company_id != user.company_id) {
      throw new Error("User is not authorized");
    }
  }
}
