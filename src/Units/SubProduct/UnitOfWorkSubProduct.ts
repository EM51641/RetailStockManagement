import { Injectable, Scope } from "@nestjs/common";
import {
  ProductRepository,
  SubProductRepository,
} from "../../Repositories/Product";
import { UnitOfWork } from "../Base";

interface ISubProductUnitOfWork {
  get subproduct_repository(): SubProductRepository;
  get product_repository(): ProductRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class SubProductUnitOfWork
  extends UnitOfWork
  implements ISubProductUnitOfWork
{
  private readonly _subproduct_repository: SubProductRepository =
    new SubProductRepository(this.context);
  private readonly _product_repository: ProductRepository =
    new ProductRepository(this.context);

  get subproduct_repository(): SubProductRepository {
    return this._subproduct_repository;
  }
  get product_repository(): ProductRepository {
    return this._product_repository;
  }
}
