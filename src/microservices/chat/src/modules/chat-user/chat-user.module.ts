import { Module } from '@nestjs/common';
import { ChatUserService } from './chat-user.service';
import { ChatUserController } from './chat-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatUser, ChatUserSchema } from './schemas/chat-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatUser.name, schema: ChatUserSchema }]),
  ],
  controllers: [ChatUserController],
  providers: [ChatUserService]
})
export class ChatUserModule {}
