import { CountExcecutionStatus } from "../Models/CountPlan";
import { DomainBase } from "./Base";

export class CountPlan extends DomainBase {
  constructor(
    uid: string,
    private _company_id: string,
    private _expiration: Date,
  ) {
    super(uid);
  }

  get company_id() {
    return this._company_id;
  }

  get expiration() {
    return this._expiration;
  }

  set_expiration(value: Date) {
    this._expiration = value;
  }
}

export class CountExecution extends DomainBase {
  constructor(
    uid: string,
    private _plan_id: string,
    private _status: CountExcecutionStatus,
  ) {
    super(uid);
  }

  get plan_id() {
    return this._plan_id;
  }

  get status() {
    return this._status;
  }
}

export class CountSubProduct extends DomainBase {
  constructor(
    uid: string,
    private _subproduct_id: string,
    private _count_execution_id: string,
    private _quantity: number,
  ) {
    super(uid);
  }

  get subproduct_id() {
    return this._subproduct_id;
  }

  get count_execution_id() {
    return this._count_execution_id;
  }

  get quantity() {
    return this._quantity;
  }

  set_quantity(value: number) {
    this._quantity = value;
  }
}
