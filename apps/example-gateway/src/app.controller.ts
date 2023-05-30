import { Controller, Get, Render } from '@joktec/core';

@Controller('/')
export class AppController {
  @Get('/home')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
