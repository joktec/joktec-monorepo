import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopUserScoreNotificationDto } from './create-jobhop-userscorenotification.dto';

export class UpdateJobhopUserScoreNotificationDto extends PartialType(CreateJobhopUserScoreNotificationDto) {}
