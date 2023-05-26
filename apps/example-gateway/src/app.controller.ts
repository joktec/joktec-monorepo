import { Controller, Get, Render } from '@joktec/core';

@Controller('/')
export class AppController {
  @Get('/index')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
