import {
  BaseMicroserviceController,
  SkillMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { SkillService } from './skill.service';
import { PLURAL_NAME } from './skill.constants';

@Controller(PLURAL_NAME)
export class SkillController extends BaseMicroserviceController(
  SkillMessagePattern,
) {
  constructor(private readonly skillService: SkillService) {
    super(skillService);
  }
}
