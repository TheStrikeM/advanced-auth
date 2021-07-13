import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IUser } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  create(@Body() values) {
    console.log(values);
    return this.appService.create(values);
  }

  @Get()
  sayHello() {
    return 'Привет!';
  }
}
