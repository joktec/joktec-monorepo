import {
  BaseMicroserviceController,
  TagSubFunctionMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { TagSubFunctionService } from './tag-sub-function.service';

@Controller('tag-sub-function')
export class TagSubFunctionController extends BaseMicroserviceController(
  TagSubFunctionMessagePattern,
) {
  constructor(private readonly tagSubFunctionService: TagSubFunctionService) {
    super(tagSubFunctionService);
  }
}
