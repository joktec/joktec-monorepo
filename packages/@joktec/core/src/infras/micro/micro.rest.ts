import { Controller, Post, Body, Param } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { MicroServiceNotFoundException } from './exceptions/micro-service-not-found.exception';
import { MicroMethodNotFoundException } from './exceptions/micro-method-not-found.exception';
import { snakeCase } from 'lodash';

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
      const msg = snakeCase(`${service} Micro is not found`).toUpperCase();
      throw new MicroServiceNotFoundException(msg);
    }

    const methodInstance = serviceInstance[method];
    if (!methodInstance) {
      const msg: string = snakeCase(`${service}:${method} Micro method is not found`).toUpperCase();
      throw new MicroMethodNotFoundException(msg);
    }
    return methodInstance(req);
  }
}
