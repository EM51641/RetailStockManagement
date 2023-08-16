import { Module } from "@nestjs/common";
import {
  LocalAuthGuard,
  LocalStrategy,
  UserRegistrationService,
} from "./User/User";
import { PassportModule } from "@nestjs/passport";
import { UnitOfWorkModule } from "../Units/Unit.module";

@Module({
  imports: [PassportModule, UnitOfWorkModule],
  providers: [UserRegistrationService, LocalStrategy, LocalAuthGuard],
  exports: [UserRegistrationService, LocalStrategy, LocalAuthGuard],
})
export class ServiceModule {}
