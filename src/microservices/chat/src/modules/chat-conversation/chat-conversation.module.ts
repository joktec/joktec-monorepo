import { Module } from '@nestjs/common';
import { ChatConversationService } from './chat-conversation.service';
import { ChatConversationController } from './chat-conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatConversation, ChatConversationSchema } from './schemas/chat-conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatConversation.name, schema: ChatConversationSchema }]),
  ],
  controllers: [ChatConversationController],
  providers: [ChatConversationService]
})
export class ChatConversationModule {}
