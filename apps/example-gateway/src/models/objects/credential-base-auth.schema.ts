import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class CredentialBaseAuth {
  @Prop({ default: null })
  username?: string;

  @Prop({ default: null })
  password?: string;
}
