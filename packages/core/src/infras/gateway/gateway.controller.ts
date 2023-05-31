import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppConfig, initConfig } from '../../config';
import { toBool } from '../../utils';
import { GatewayPromInterceptor } from './gateway-prom.interceptor';

@Controller()
export class GatewayController {
  @Get('/')
  @ApiResponse({ type: Object })
  @UseInterceptors(GatewayPromInterceptor)
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
  @UseInterceptors(GatewayPromInterceptor)
  healthCheck() {
    return { status: 'ok' };
  }
}
