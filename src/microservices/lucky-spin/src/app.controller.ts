import { Controller, Get } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  getHello(): string {
    return 'Hello, Lucky Spin Service';
  }

  @Get('/health')
  health() {
    return 'OK';
  }
}
