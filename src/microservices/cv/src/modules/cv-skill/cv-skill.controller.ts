import {
  BaseMicroserviceController,
  CvSkillMessagePattern
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvSkillService } from './cv-skill.service';

@Controller('cv-skill')
export class CvSkillController extends BaseMicroserviceController(
  CvSkillMessagePattern,
) {
  constructor(private readonly cvService: CvSkillService) {
    super(cvService);
  }
}
