import { v4 } from "uuid";
import { CountPlan } from "../../Domains/CountPlan";
import { User } from "../../Domains/User";
import { CountPlanRepository } from "../../Repositories/CountPlan";
import { AdminRepository, UserRepository } from "../../Repositories/User";
import { UnitOfWork } from "../../Units/Base";
import { BaseService } from "../Base";

type CreateUserPlanDTO = {
  user_id: string;
  plan_id: string;
  days: number;
};

interface ICountPlanBuilder {
  add_count_plan(): Promise<void>;
  get count_plan_repository(): CountPlanRepository;
  get user_repository(): UserRepository;
  get admin_repository(): AdminRepository;
}

export class CountPlanBuilder extends BaseService implements ICountPlanBuilder {
  private _count_plan_repository: CountPlanRepository;
  private _user_repository: UserRepository;
  private _admin_repository: AdminRepository;

  constructor(
    unit_of_work: UnitOfWork,
    private _data: CreateUserPlanDTO,
  ) {
    super(unit_of_work);
    this._count_plan_repository = new CountPlanRepository(
      this.unit_of_work.context,
    );
    this._user_repository = new UserRepository(this.unit_of_work.context);
    this._admin_repository = new AdminRepository(this.unit_of_work.context);
  }

  get count_plan_repository(): CountPlanRepository {
    return this._count_plan_repository;
  }

  get user_repository(): UserRepository {
    return this._user_repository;
  }

  get admin_repository(): AdminRepository {
    return this._admin_repository;
  }

  async add_count_plan(): Promise<void> {
    const user = await this._user_repository.FindById(this._data.user_id);
    await this.is_user_authorized(user);
    const id = v4();
    const expiration = this.set_expiration();
    const count_plan = new CountPlan(
      id,
      user.company_id,
      this._data.plan_id,
      expiration,
    );
    await this._count_plan_repository.add(count_plan);
    this._unit_of_work.save();
  }

  private async is_user_authorized(user: User) {
    await this.is_user_in_company(user);
    await this.is_user_admin();
  }
  private async is_user_in_company(user: User) {
    const plan = await this._count_plan_repository.FindById(this._data.plan_id);
    if (user.company_id != plan.company_id) {
      throw Error("User is not authorized to create a plan for this company");
    }
  }

  private async is_user_admin() {
    const admin = await this._admin_repository.get_admin_by_user_id(
      this._data.user_id,
    );
    if (!admin) {
      throw Error("Only admin are authorized to create plans");
    }
  }

  private set_expiration() {
    let date = new Date();
    date.setDate(date.getDate() + this._data.days);
    return date;
  }
}
