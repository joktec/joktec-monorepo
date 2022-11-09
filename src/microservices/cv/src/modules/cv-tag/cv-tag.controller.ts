import {
  BaseMicroserviceController,
  CvTagMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvTagService } from './cv-tag.service';

@Controller('cv-tag')
export class CvTagController extends BaseMicroserviceController(
  CvTagMessagePattern,
) {
  constructor(private readonly cvService: CvTagService) {
    super(cvService);
  }
}
