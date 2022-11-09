import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type RBannerActionDocument = RBannerAction & CustomMongooseDocument;

@Schema({ collection: 'r_banner_action' })
export class RBannerAction {
  @Prop({ default: uuid() })
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  organizationId: string;

  @Prop()
  jobId: string;

  @Prop()
  extraData: string;

  @Prop()
  bannerId: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RBannerActionSchema = SchemaFactory.createForClass(RBannerAction);
