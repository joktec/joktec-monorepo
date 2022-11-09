import { AppConfig, config } from '@core/config';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { toBool } from '@core/utils';

@Controller()
export class GatewayRest {
  @Get('/')
  @ApiResponse({ type: Object })
  async getHello() {
    const appConfig: AppConfig = await config();
    return {
      name: appConfig.name.replace('@', '').replace('/', '-'),
      description: appConfig.description,
      version: appConfig.version,
      isProd: toBool(appConfig.isProd, false),
    };
  }

  @Get('/health')
  @ApiResponse({ type: Object })
  health() {
    return {
      status: 'ok',
    };
  }
}
