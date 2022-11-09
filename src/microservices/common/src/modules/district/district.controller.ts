import {
  BaseMicroserviceController,
  DistrictMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { DistrictService } from './district.service';
import { PLURAL_NAME } from './district.constants';

@Controller(PLURAL_NAME)
export class DistrictController extends BaseMicroserviceController(
  DistrictMessagePattern,
) {
  constructor(private readonly districtService: DistrictService) {
    super(districtService);
  }
}
