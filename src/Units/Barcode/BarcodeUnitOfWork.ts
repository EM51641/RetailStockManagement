import { Injectable, Scope } from "@nestjs/common";
import {
  BarcodeRepository,
  SubProductRepository,
} from "../../Repositories/Product";
import { UnitOfWork } from "../Base";

interface IBarcodeUnitOfWork {
  get subproduct_repository(): SubProductRepository;
  get barcode_repository(): BarcodeRepository;
}

@Injectable({ scope: Scope.REQUEST })
export class BarcodeUnitOfWork
  extends UnitOfWork
  implements IBarcodeUnitOfWork
{
  private readonly _barcode_repository: BarcodeRepository =
    new BarcodeRepository(this.context);
  private readonly _subproduct_repository: SubProductRepository =
    new SubProductRepository(this.context);

  get barcode_repository(): BarcodeRepository {
    return this._barcode_repository;
  }
  get subproduct_repository(): SubProductRepository {
    return this._subproduct_repository;
  }
}
