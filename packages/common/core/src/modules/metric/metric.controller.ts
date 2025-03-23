import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Response } from 'express';

@ApiTags('Default')
@Controller('metrics')
export class MetricController extends PrometheusController {
  @Get()
  index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
