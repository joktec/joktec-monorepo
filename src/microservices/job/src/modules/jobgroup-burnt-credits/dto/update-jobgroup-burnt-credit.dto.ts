import { PartialType } from '@nestjs/mapped-types';
import { CreateJobgroupBurntCreditDto } from './create-jobgroup-burnt-credit.dto';

export class UpdateJobgroupBurntCreditDto extends PartialType(CreateJobgroupBurntCreditDto) {}
