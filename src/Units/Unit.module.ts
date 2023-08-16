import { Module } from "@nestjs/common";
import { BarcodeUnitOfWork } from "./Barcode/BarcodeUnitOfWork";
import { CompanyUnitOfWork } from "./Company/UnitOfWorkCompany";
import { CountExecutionUnitOfWork } from "./CountExecution/CountExecution.UnitOfWork";
import { CountPlanUnitOfWork } from "./CountPlan/CountPlan.UnitOfWork";
import { CountUserSubProductUnitOfWork } from "./CountUserSubproduct/count_user_subproduct.unit_of_work";
import { ProductUnitOfWork } from "./ProductSubProduct";
import { SubProductUnitOfWork } from "./SubProduct/UnitOfWorkSubProduct";
import { UserUnitOfWork } from "./User/UnitOfWorkUser";

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
