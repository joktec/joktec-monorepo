import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ExceptionMessage, MethodNotAllowedException, ServiceUnavailableException } from '../../exceptions';
import { MicroPromInterceptor } from './micro-prom.interceptor';

@Controller()
export class MicroController {
  constructor(private moduleRef: ModuleRef) {}

  @Post('/micro/:service/:method')
  @ApiBody({ type: Object })
  @ApiResponse({ type: Object })
  @UseInterceptors(MicroPromInterceptor)
  async micro(
    @Param('service') service: string,
    @Param('method') method: string,
    @Body() req: object,
  ): Promise<Object> {
    let serviceInstance = null;
    try {
      serviceInstance = await this.moduleRef.get(service, { strict: false });
    } catch (ex) {
      throw new ServiceUnavailableException(ExceptionMessage.MICRO_SERVICE_NOT_FOUND, { service });
    }

    const methodInstance = serviceInstance[method];
    if (!methodInstance) {
      throw new MethodNotAllowedException(ExceptionMessage.MICRO_METHOD_NOT_FOUND, { service, method });
    }
    return methodInstance(req);
  }
}
