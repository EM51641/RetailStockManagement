import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import {
    LocalAuthGuard,
    UserRegistrationDTO,
    UserRegistrationService,
} from "../Services/User/User";

@Controller("signup")
export class UsersRegisterController {
  constructor(private readonly registration_service: UserRegistrationService) {}
  //post / signup
  @Post("/")
  async register(@Body() form: UserRegistrationDTO) {
    const result = await this.registration_service.register_user(form);
    return {
      msg: "User successfully registered",
      user: result,
    };
  }
}

@Controller("login")
export class UsersLoginController {
  //post / signin
  @UseGuards(LocalAuthGuard);
  @Post("/")
  login(@Request() req: any): any {
    return {
      user: req.user,
      msg: "User successfully logged in",
    };
  }

  @Get('/protected')
  getuser(@Request() req: any): string {
    return req.user;
  }
    }
