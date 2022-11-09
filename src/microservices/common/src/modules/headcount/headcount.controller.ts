import {
  BaseMicroserviceController,
  HeadcountMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { HeadcountService } from './headcount.service';

@Controller('Headcounts')
export class HeadcountController extends BaseMicroserviceController(
  HeadcountMessagePattern,
) {
  constructor(private readonly headcountService: HeadcountService) {
    super(headcountService);
  }
}
