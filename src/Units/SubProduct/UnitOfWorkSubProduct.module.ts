import { Module } from "@nestjs/common";
import { SubProductUnitOfWork } from "./UnitOfWorkSubProduct";

@Module({
  imports: [],
  controllers: [],
  providers: [SubProductUnitOfWork],
  exports: [SubProductUnitOfWork],
})
export class SubProductUnitOfWorkModule {}
