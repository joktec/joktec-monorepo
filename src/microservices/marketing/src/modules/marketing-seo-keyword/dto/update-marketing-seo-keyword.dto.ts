import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketingSeoKeywordDto } from './create-marketing-seo-keyword.dto';

export class UpdateMarketingSeoKeywordDto extends PartialType(CreateMarketingSeoKeywordDto) {}
