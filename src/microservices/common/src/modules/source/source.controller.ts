import {
  BaseMicroserviceController,
  SourceMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { SourceService } from './source.service';
import { PLURAL_NAME } from './source.constants';

@Controller(PLURAL_NAME)
export class SourceController extends BaseMicroserviceController(
  SourceMessagePattern,
) {
  constructor(private readonly sourceService: SourceService) {
    super(sourceService);
  }
}
