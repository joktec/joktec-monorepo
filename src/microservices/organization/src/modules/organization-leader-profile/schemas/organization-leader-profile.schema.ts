import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type OrganizationLeaderProfileDocument = OrganizationLeaderProfile &
  CustomMongooseDocument;

@Schema({ collection: 'organization_leader_profile' })
export class OrganizationLeaderProfile {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  sqlId: string;
  @Prop()
  name: string;
  @Prop()
  jobTitle: string;
  @Prop()
  avatar: string;
  @Prop()
  linkedinLink: string;
  @Prop()
  organizationId: string;
}

export const OrganizationLeaderProfileSchema = SchemaFactory.createForClass(
  OrganizationLeaderProfile,
);
