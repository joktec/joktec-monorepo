import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type ChatMediaFileDocument = ChatMediaFile  & CustomMongooseDocument;

@Schema({ collection: 'chat_media_file' })
export class ChatMediaFile {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  channelSid: string;
  @Prop()
  file: string;
  @Prop()
  fileSize: number;
  @Prop()
  mediaType: string;
  @Prop()
  contentType: string;
  @Prop()
  createDate: Date;
  @Prop()
  uploadedBy: string;
  @Prop()
  fileName: string;
}

export const ChatMediaFileSchema = SchemaFactory.createForClass(ChatMediaFile);
