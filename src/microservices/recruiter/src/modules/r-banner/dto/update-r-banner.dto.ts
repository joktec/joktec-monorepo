import { PartialType } from '@nestjs/mapped-types';
import { CreateRBannerDto } from './create-r-banner.dto';

export class UpdateRBannerDto extends PartialType(CreateRBannerDto) {}
