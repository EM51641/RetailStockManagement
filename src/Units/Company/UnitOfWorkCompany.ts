import { Injectable, Scope } from "@nestjs/common";
import { CompanyRepository } from "../../Repositories/Company";
import { CategoryRepository } from "../../Repositories/Product";
import { UnitOfWork } from "../Base";

interface ICompanyUnitOfWork {
  get company_repository(): CompanyRepository;
  get category_repository(): CategoryRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class CompanyUnitOfWork
  extends UnitOfWork
  implements ICompanyUnitOfWork
{
  private readonly _company_repository: CompanyRepository =
    new CompanyRepository(this.context);

  private readonly _category_repository: CategoryRepository =
    new CategoryRepository(this.context);

  get company_repository(): CompanyRepository {
    return this._company_repository;
  }

  get category_repository(): CategoryRepository {
    return this._category_repository;
  }
}
