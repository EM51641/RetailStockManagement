import { Body, Controller, Get, ParseIntPipe, Post, Put } from "@nestjs/common";

interface CreateCompanyDto {
  name: string;
}

@Controller("company")
export class CompanyController {
  //'postUser()' will handle the creating of new User
  @Post("post")
  postUser(@Body() user: CreateCompanyDto) {
    return this;
  }
  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.company_creation_service.getAllUsers();
  }

  //'getBooks()' return all the books which are associated with the user
  // provided through 'userID' by the request
  @Get("books")
  getBooks(@Body("userID", ParseIntPipe) userID: number) {
    return this.company_creation_service.getBooksOfUser(userID);
  }
}
