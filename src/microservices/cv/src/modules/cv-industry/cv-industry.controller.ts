import {
  BaseMicroserviceController,
  CvIndustryMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvIndustryService } from './cv-industry.service';

@Controller('cv-industry')
export class CvIndustryController extends BaseMicroserviceController(
  CvIndustryMessagePattern,
) {
  constructor(private readonly cvService: CvIndustryService) {
    super(cvService);
  }
}
