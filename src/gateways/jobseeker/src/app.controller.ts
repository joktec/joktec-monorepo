import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'Jobseeker gateway';
  }

  @Get('/health')
  health() {
    return 'OK';
  }
}
