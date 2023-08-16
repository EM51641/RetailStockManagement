import { Module } from "@nestjs/common";
import { UserUnitOfWork } from "./UnitOfWorkUser";

@Module({
  imports: [],
  controllers: [],
  providers: [UserUnitOfWork],
  exports: [UserUnitOfWork],
})
export class UserUnitOfWorkModule {}
