import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppConfig, initConfig } from '../../config';
import { toBool } from '../../utils';
import { GatewayMetric } from './gateway.metric';

@Controller()
export class GatewayController {
  @Get('/')
  @ApiResponse({ type: Object })
  @UseInterceptors(GatewayMetric)
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
  @UseInterceptors(GatewayMetric)
  async healthCheck() {
    return { status: 'ok' };
  }
}
