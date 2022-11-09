import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CvMailBoxDocument = CvMailBox & CustomMongooseDocument;

@Schema({ collection: 'cv_mailbox' })
export class CvMailBox {
  @Prop({ default: uuid() })
  _id: string;
  
  @Prop()
  messageId: string;

  @Prop()
  eventId: string;

  @Prop()
  domain: string;

  @Prop()
  sender: string;

  @Prop()
  targetEmail: string;

  @Prop()
  fileName: string;

  @Prop()
  contentType: string;

  @Prop()
  fileSize: number;

  @Prop()
  timestamp: Date;

  @Prop()
  storageUrl: string;

  @Prop()
  strongeKey: string;

  @Prop()
  cvId: string;
}

export const CvMailBoxSchema = SchemaFactory.createForClass(CvMailBox);
