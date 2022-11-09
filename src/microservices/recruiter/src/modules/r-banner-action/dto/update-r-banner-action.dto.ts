import { PartialType } from '@nestjs/mapped-types';
import { CreateRBannerActionDto } from './create-r-banner-action.dto';

export class UpdateRBannerActionDto extends PartialType(CreateRBannerActionDto) {}
