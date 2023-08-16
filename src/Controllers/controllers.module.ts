import { Module } from "@nestjs/common";
import { UserRegistrationService } from "../Controllers/User";
import { ServiceModule } from "../Services/service.module";

@Module({
  imports: [ServiceModule],
  controllers: [],
  exports: [],
})
export class ControllerModule {}
