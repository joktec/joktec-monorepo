import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GatewayMetric } from './gateway.metric';

@ApiTags('Default')
@Controller('/')
export class GatewayController {
  @Get('/health')
  @ApiResponse({ type: Object })
  @UseInterceptors(GatewayMetric)
  async healthCheck() {
    return { status: 'ok' };
  }
}
