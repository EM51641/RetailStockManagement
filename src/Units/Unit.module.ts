import { BarcodeUnitOfWork } from "./Barcode/BarcodeUnitOfWork";
import { CompanyUnitOfWork } from "./Company/UnitOfWorkCompany";
import { CountExecutionUnitOfWork } from "./CountExecution/CountExecution.UnitOfWork";
import { CountPlanUnitOfWork } from "./CountPlan/CountPlan.UnitOfWork";
import { CountUserSubProductUnitOfWork } from "./CountUserSubproduct/count_user_subproduct.unit_of_work";
import { SubProductUnitOfWork } from "./SubProduct/UnitOfWorkSubProduct";
import { UserUnitOfWork } from "./User/UnitOfWorkUser";
import { ProductUnitOfWork } from "./Product/UnitOfWorkProduct";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [
    ProductUnitOfWork,
    CompanyUnitOfWork,
    UserUnitOfWork,
    SubProductUnitOfWork,
    CountExecutionUnitOfWork,
    CountPlanUnitOfWork,
    CountUserSubProductUnitOfWork,
    BarcodeUnitOfWork,
  ],
  exports: [
    ProductUnitOfWork,
    CompanyUnitOfWork,
    UserUnitOfWork,
    SubProductUnitOfWork,
    CountExecutionUnitOfWork,
    CountPlanUnitOfWork,
    CountUserSubProductUnitOfWork,
    BarcodeUnitOfWork,
  ],
})
export class UnitOfWorkModule {}
