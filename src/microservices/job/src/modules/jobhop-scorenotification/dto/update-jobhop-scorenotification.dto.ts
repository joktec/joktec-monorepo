import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopScoreNotificationDto } from './create-jobhop-scorenotification.dto';

export class UpdateJobhopScoreNotificationDto extends PartialType(CreateJobhopScoreNotificationDto) {}
