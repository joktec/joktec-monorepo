import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { MicroServiceNotFoundException } from './errors/micro-service-not-found.exception';
import { MicroMethodNotFoundException } from './errors/micro-method-not-found.exception';
import { AppConfig, config } from '../../config';
import { toBool } from '../../utils';

@Controller()
export class MicroRest {
  constructor(private moduleRef: ModuleRef) {}

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

  @Post('/micro/:service/:method')
  @ApiBody({ type: Object })
  @ApiResponse({ type: Object })
  async micro(@Param('service') service: string, @Param('method') method: string, @Body() req: {}): Promise<Object> {
    let serviceInstance = null;
    try {
      serviceInstance = await this.moduleRef.get(service, { strict: false });
    } catch (ex) {
      throw new MicroServiceNotFoundException(`${service} Micro is not found`);
    }

    const methodInstance = serviceInstance[method];
    if (!methodInstance) throw new MicroMethodNotFoundException(`${service}:${method} Micro method is not found`);
    return methodInstance(req);
  }
}
