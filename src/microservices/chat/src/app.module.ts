import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@jobhopin/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatConversationModule } from './modules/chat-conversation/chat-conversation.module';
import { ChatConversationMemberModule } from './modules/chat-conversation-member/chat-conversation-member.module';
import { ChatMediaFileModule } from './modules/chat-media-file/chat-media-file.module';
import { ChatMediaMessageModule } from './modules/chat-media-message/chat-media-message.module';
import { ChatMessageModule } from './modules/chat-message/chat-message.module';
import { ChatSuggestedMessageModule } from './modules/chat-suggested-message/chat-suggested-message.module';
import { ChatUserModule } from './modules/chat-user/chat-user.module';
import { ChatUserConversationModule } from './modules/chat-user-conversation/chat-user-conversation.module';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forRoot(process.env.CHAT_SERVICE_MONGODB_URL),
    HealthModule,
    ChatConversationModule,
    ChatConversationMemberModule,
    ChatMediaFileModule,
    ChatMediaMessageModule,
    ChatMessageModule,
    ChatSuggestedMessageModule,
    ChatUserModule,
    ChatUserConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
