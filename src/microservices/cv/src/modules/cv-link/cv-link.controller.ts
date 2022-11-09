import {
  BaseMicroserviceController,
  CvLinkMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvLinkService } from './cv-link.service';

@Controller('cv-link')
export class CvLinkController extends BaseMicroserviceController(
  CvLinkMessagePattern,
) {
  constructor(private readonly cvService: CvLinkService) {
    super(cvService);
  }
}
