import {
  BaseMicroserviceController,
  TagFunctionMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { TagFunctionService } from './tag-function.service';

@Controller('tag-function')
export class TagFunctionController extends BaseMicroserviceController(
  TagFunctionMessagePattern,
) {
  constructor(private readonly tagFunctionService: TagFunctionService) {
    super(tagFunctionService);
  }

  @MessagePattern(TagFunctionMessagePattern.MISC)
  misc(): Promise<any> {
    try {
      return this.tagFunctionService.misc();
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
