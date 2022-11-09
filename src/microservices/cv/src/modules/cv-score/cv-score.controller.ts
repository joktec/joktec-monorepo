import {
  BaseMicroserviceController,
  CvScoreMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvScoreService } from './cv-score.service';

@Controller('cv-score')
export class CvScoreController extends BaseMicroserviceController(
  CvScoreMessagePattern,
) {
  constructor(private readonly cvService: CvScoreService) {
    super(cvService);
  }
}
