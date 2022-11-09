import { BaseMicroserviceController, CvMessagePattern } from '@jobhopin/core';
import {
  Controller
} from '@nestjs/common';
import { CvService } from './cv.service';

@Controller('cv')
export class CvController extends BaseMicroserviceController(CvMessagePattern) {
  constructor(private readonly cvService: CvService) {
    super(cvService);
  }
}
