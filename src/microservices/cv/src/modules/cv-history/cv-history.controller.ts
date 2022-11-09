import {
  BaseMicroserviceController,
  CvHistoryMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvHistoryService } from './cv-history.service';

@Controller('cv-history')
export class CvHistoryController extends BaseMicroserviceController(
  CvHistoryMessagePattern,
) {
  constructor(private readonly cvService: CvHistoryService) {
    super(cvService);
  }
}
