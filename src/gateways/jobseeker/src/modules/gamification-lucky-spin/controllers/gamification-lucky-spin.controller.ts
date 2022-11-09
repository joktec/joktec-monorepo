import {
  BaseConditionInput,
  BaseController,
  BaseCreateInput,
  BasePaginationInput,
  BaseQueryInput,
  BaseUpdateInput,
  GameLuckySpinMessagePattern,
  LuckySpinMicroserviceConfig,
  BaseDto,
  BaseListResponseDto,
} from '@jobhopin/core';
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();

@Controller('lucky-spins')
export class GamificationLuckySpinController extends BaseController<
  BaseDto,
  BaseCreateInput,
  BaseUpdateInput,
  BaseQueryInput<BaseConditionInput, BasePaginationInput>,
  BaseListResponseDto<BaseDto>
> {
  constructor(
    @Inject(luckySpinMicroserviceConfig.name)
    private readonly luckySpinMicroservice: ClientProxy,
  ) {
    super(luckySpinMicroservice, GameLuckySpinMessagePattern);
  }
}
