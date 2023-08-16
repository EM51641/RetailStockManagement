import { UnitOfWork } from "../Units/Base";

interface IBaseService {
  get unit_of_work(): UnitOfWork;
}

export abstract class BaseService implements IBaseService {
  constructor(protected _unit_of_work: UnitOfWork) {}
  get unit_of_work(): UnitOfWork {
    return this._unit_of_work;
  }
}
