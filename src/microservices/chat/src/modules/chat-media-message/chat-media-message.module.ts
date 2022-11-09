import { Module } from '@nestjs/common';
import { ChatMediaMessageService } from './chat-media-message.service';
import { ChatMediaMessageController } from './chat-media-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMediaMessage, ChatMediaMessageSchema } from './schemas/chat-media-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatMediaMessage.name, schema: ChatMediaMessageSchema }]),
  ],
  controllers: [ChatMediaMessageController],
  providers: [ChatMediaMessageService]
})
export class ChatMediaMessageModule {}
