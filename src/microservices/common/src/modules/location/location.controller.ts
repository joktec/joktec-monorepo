import {
  BaseMicroserviceController,
  LocationMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { LocationService } from './location.service';
import { PLURAL_NAME } from './location.constants';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller(PLURAL_NAME)
export class LocationController extends BaseMicroserviceController(
  LocationMessagePattern,
) {
  constructor(private readonly locationService: LocationService) {
    super(locationService);
  }
}
