import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketingKeywordDto } from './create-marketing-keyword.dto';

export class UpdateMarketingKeywordDto extends PartialType(CreateMarketingKeywordDto) {}
