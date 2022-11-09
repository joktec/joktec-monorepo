import {
  BaseMicroserviceController,
  SuggestedSkillMessagePattern,
} from '@jobhopin/core';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { SuggestedSkillService } from './suggested-skill.service';

@Controller('suggested-skill')
export class SuggestedSkillController extends BaseMicroserviceController(
  SuggestedSkillMessagePattern,
) {
  constructor(private readonly suggestedSkillService: SuggestedSkillService) {
    super(suggestedSkillService);
  }

  @MessagePattern(SuggestedSkillMessagePattern.SEARCH_AUTOCOMPLETE)
  searchAutocomplete(params: { keyword: string }): Promise<any> {
    try {
      return this.suggestedSkillService.searchAutocomplete(params.keyword);
    } catch (error) {
      throw new RpcException(error as any);
    }
  }
}
