import {
  BaseMicroserviceController,
  IndustryMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { PLURAL_NAME } from './industry.constants';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller(PLURAL_NAME)
export class IndustryController extends BaseMicroserviceController(
  IndustryMessagePattern,
) {
  constructor(private readonly industryService: IndustryService) {
    super(industryService);
  }

  @MessagePattern(IndustryMessagePattern.FPTO_TOP_INDUSTRY)
  fptoTopIndustry(): Promise<any> {
    try {
      return this.industryService.fptoTopIndustry();
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
