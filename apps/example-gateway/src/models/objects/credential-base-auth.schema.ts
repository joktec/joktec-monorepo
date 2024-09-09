import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CredentialBaseAuth {
  @Prop({ required: false, default: null })
  username?: string;

  @Prop({ required: false, default: null })
  password?: string;
}
