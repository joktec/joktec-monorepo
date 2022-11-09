import {
  BaseMicroserviceController,
  DegreeMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { DegreeService } from './degree.service';
import { PLURAL_NAME } from './degree.constants';

@Controller(PLURAL_NAME)
export class DegreeController extends BaseMicroserviceController(
  DegreeMessagePattern,
) {
  constructor(private readonly degreeService: DegreeService) {
    super(degreeService);
  }
}
