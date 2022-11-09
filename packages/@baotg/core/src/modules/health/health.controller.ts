import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  HealthCheck() {
    return {
      status: 'ok',
    };
  }
}
