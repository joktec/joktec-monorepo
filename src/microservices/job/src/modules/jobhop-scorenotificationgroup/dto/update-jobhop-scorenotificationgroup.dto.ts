import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopScoreNotificationGroupDto } from './create-jobhop-scorenotificationgroup.dto';

export class UpdateJobhopScoreNotificationGroupDto extends PartialType(CreateJobhopScoreNotificationGroupDto) {}
