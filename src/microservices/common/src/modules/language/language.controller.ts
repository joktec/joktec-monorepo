import {
  BaseMicroserviceController,
  LanguageMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController extends BaseMicroserviceController(
  LanguageMessagePattern,
) {
  constructor(private readonly languageService: LanguageService) {
    super(languageService);
  }
}
