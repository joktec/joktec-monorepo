import { Module } from '@nestjs/common';
import { ChatConversationMemberService } from './chat-conversation-member.service';
import { ChatConversationMemberController } from './chat-conversation-member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatConversationMember, ChatConversationMemberSchema } from './schemas/chat-conversation-member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatConversationMember.name, schema: ChatConversationMemberSchema }]),
  ],
  controllers: [ChatConversationMemberController],
  providers: [ChatConversationMemberService]
})
export class ChatConversationMemberModule {}
