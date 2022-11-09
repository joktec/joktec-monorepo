import {
  BaseMicroserviceController,
  CvTemplateMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvTemplatesService } from './cv-templates.service';

@Controller('cv-templates')
export class CvTemplatesController extends BaseMicroserviceController(
  CvTemplateMessagePattern,
) {
  constructor(private readonly cvService: CvTemplatesService) {
    super(cvService);
  }
}
