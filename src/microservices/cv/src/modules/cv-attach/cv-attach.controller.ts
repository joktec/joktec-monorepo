import {
  BaseMicroserviceController,
  CvAttachMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvAttachService } from './cv-attach.service';

@Controller('cv-attach')
export class CvAttachController extends BaseMicroserviceController(
  CvAttachMessagePattern,
) {
  constructor(private readonly cvService: CvAttachService) {
    super(cvService);
  }
}
