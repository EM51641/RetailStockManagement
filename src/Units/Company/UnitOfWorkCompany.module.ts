import { Module } from "@nestjs/common";
import { CompanyUnitOfWork } from "./UnitOfWorkCompany";

@Module({
  imports: [],
  controllers: [],
  providers: [CompanyUnitOfWork],
  exports: [CompanyUnitOfWork],
})
export class CompanyUnitOfWorkModule {}
