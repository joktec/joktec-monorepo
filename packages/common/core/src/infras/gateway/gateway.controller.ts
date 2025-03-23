import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class GatewayController {
  constructor() {}

  @Get('health')
  @ApiResponse({ type: Object })
  async healthCheck() {
    return { status: 'ok' };
  }
}
