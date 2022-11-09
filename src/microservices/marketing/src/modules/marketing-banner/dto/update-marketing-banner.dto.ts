import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketingBannerDto } from './create-marketing-banner.dto';

export class UpdateMarketingBannerDto extends PartialType(CreateMarketingBannerDto) {}
