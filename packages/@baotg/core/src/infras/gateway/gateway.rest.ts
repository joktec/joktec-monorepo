import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppConfig, initConfig } from '../../config';
import { toBool } from '../../utils';

@Controller()
export class GatewayRest {
  @Get('/')
  @ApiResponse({ type: Object })
  async getHello() {
    const appConfig: AppConfig = initConfig();
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
