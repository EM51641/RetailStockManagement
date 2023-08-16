import { Injectable, Scope } from "@nestjs/common";
import { CompanyRepository } from "../../Repositories/Company";
import {
  CategoryRepository,
  ProductRepository,
} from "../../Repositories/Product";
import { UnitOfWork } from "../Base";

interface IProductUnitOfWork {
  get product_repository(): ProductRepository;
  get category_repository(): CategoryRepository;
  get company_repository(): CompanyRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class ProductUnitOfWork
  extends UnitOfWork
  implements IProductUnitOfWork
{
  private readonly _company_repository: CompanyRepository =
    new CompanyRepository(this.context);
  private readonly _product_repository: ProductRepository =
    new ProductRepository(this.context);
  private readonly _category_repository: CategoryRepository =
    new CategoryRepository(this.context);

  get product_repository(): ProductRepository {
    return this._product_repository;
  }
  get category_repository(): CategoryRepository {
    return this._category_repository;
  }

  get company_repository(): CompanyRepository {
    return this._company_repository;
  }
}
