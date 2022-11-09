import { Module } from '@nestjs/common';
import { ChatMediaFileService } from './chat-media-file.service';
import { ChatMediaFileController } from './chat-media-file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMediaFile, ChatMediaFileSchema } from './schemas/chat-media-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatMediaFile.name, schema: ChatMediaFileSchema }]),
  ],
  controllers: [ChatMediaFileController],
  providers: [ChatMediaFileService]
})
export class ChatMediaFileModule {}
