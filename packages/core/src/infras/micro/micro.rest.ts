import { Controller, Post, Body, Param } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { MicroServiceNotFoundException } from './exceptions/micro-service-not-found.exception';
import { MicroMethodNotFoundException } from './exceptions/micro-method-not-found.exception';
import { ExceptionMessage } from '../../exceptions';

@Controller()
export class MicroRest {
  constructor(private moduleRef: ModuleRef) {}

  @Post('/micro/:service/:method')
  @ApiBody({ type: Object })
  @ApiResponse({ type: Object })
  async micro(@Param('service') service: string, @Param('method') method: string, @Body() req: {}): Promise<Object> {
    let serviceInstance = null;
    try {
      serviceInstance = await this.moduleRef.get(service, { strict: false });
    } catch (ex) {
      throw new MicroServiceNotFoundException(ExceptionMessage.MICRO_SERVICE_NOT_FOUND, { service });
    }

    const methodInstance = serviceInstance[method];
    if (!methodInstance) {
      throw new MicroMethodNotFoundException(ExceptionMessage.MICRO_METHOD_NOT_FOUND, { service, method });
    }
    return methodInstance(req);
  }
}
