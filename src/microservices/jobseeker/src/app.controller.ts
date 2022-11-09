import { Controller, Get } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('jobseeker_microservice_get_hello')
  getHello(): string {
    return 'Hello, Job Service';
  }
}
