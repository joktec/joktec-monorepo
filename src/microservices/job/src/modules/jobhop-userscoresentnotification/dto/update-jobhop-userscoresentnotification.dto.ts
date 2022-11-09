import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopUserScoreSentNotificationDto } from './create-jobhop-userscoresentnotification.dto';

export class UpdateJobhopUserScoreSentNotificationDto extends PartialType(CreateJobhopUserScoreSentNotificationDto) {}
