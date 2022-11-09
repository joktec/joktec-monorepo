import {
  BaseMicroserviceController,
  SalaryReviewMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { SalaryReviewService } from './salary-review.service';

@Controller('salary-review')
export class SalaryReviewController extends BaseMicroserviceController(
  SalaryReviewMessagePattern,
) {
  constructor(private readonly salaryReviewService: SalaryReviewService) {
    super(salaryReviewService);
  }

  @MessagePattern(SalaryReviewMessagePattern.MISC_FILTER_DATA)
  misc(): Promise<any> {
    try {
      return this.salaryReviewService.miscFilterData();
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
