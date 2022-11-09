import {
  BaseMicroserviceController,
  LevelMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController extends BaseMicroserviceController(
  LevelMessagePattern,
) {
  constructor(private readonly levelService: LevelService) {
    super(levelService);
  }
}
