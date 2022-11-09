import {
  BaseMicroserviceController,
  CvMailBoxMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { CvMailBoxService } from './cv-mailbox.service';

@Controller('cv-mailbox')
export class CvMailboxController extends BaseMicroserviceController(
  CvMailBoxMessagePattern,
) {
  constructor(private readonly cvService: CvMailBoxService) {
    super(cvService);
  }
}
