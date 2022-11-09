import { NotiMessage, NotiMessageSchema } from './schemas/noti-message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NotiMessageService } from './noti-message.service';
import { NotiMessageController } from './noti-message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NotiMessage.name,
        schema: NotiMessageSchema,
      },
    ]),
  ],
  controllers: [NotiMessageController],
  providers: [NotiMessageService],
})
export class NotiMessageModule {}
