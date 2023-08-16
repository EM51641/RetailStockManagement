import { Module } from "@nestjs/common";
import { ProductUnitOfWork } from "./UnitOfWorkProduct";

@Module({
  imports: [],
  controllers: [],
  providers: [ProductUnitOfWork],
  exports: [ProductUnitOfWork],
})
export class ProductUnitOfWorkModule {}
