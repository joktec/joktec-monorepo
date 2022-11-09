import {
  BaseMicroserviceController,
  LocationTypeMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { LocationTypeService } from './location-type.service';
import { PLURAL_NAME } from './location-type.constants';

@Controller(PLURAL_NAME)
export class LocationTypeController extends BaseMicroserviceController(
  LocationTypeMessagePattern,
) {
  constructor(private readonly locationTypeService: LocationTypeService) {
    super(locationTypeService);
  }
}
