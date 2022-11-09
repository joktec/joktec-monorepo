import { Module } from '@nestjs/common';
import { ChatUserConversationService } from './chat-user-conversation.service';
import { ChatUserConversationController } from './chat-user-conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatUserConversation, ChatUserConversationSchema } from './schemas/chat-user-conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatUserConversation.name, schema: ChatUserConversationSchema }]),
  ],
  controllers: [ChatUserConversationController],
  providers: [ChatUserConversationService]
})
export class ChatUserConversationModule {}
