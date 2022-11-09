import { Module } from '@nestjs/common';
import { ChatSuggestedMessageService } from './chat-suggested-message.service';
import { ChatSuggestedMessageController } from './chat-suggested-message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSuggestedMessage, ChatSuggestedMessageSchema } from './schemas/chat-suggested-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatSuggestedMessage.name, schema: ChatSuggestedMessageSchema }]),
  ],
  controllers: [ChatSuggestedMessageController],
  providers: [ChatSuggestedMessageService]
})
export class ChatSuggestedMessageModule {}
