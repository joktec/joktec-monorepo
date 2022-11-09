import { PartialType } from '@nestjs/mapped-types';
import { CreateNotiMessageDto } from './create-noti-message.dto';

export class UpdateNotiMessageDto extends PartialType(CreateNotiMessageDto) {}
