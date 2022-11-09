import {
  BaseMicroserviceController,
  SortTypeMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { SortTypeService } from './sort-type.service';

@Controller('sort-type')
export class SortTypeController extends BaseMicroserviceController(
  SortTypeMessagePattern,
) {
  constructor(private readonly sortTypeService: SortTypeService) {
    super(sortTypeService);
  }
}
