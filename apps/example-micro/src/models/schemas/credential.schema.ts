import { Prop, PropType, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { CredentialResource, CredentialStatus, CredentialType } from '../constants';
import { CredentialBaseAuth } from '../objects';

@Schema({ collection: 'credentials', paranoid: true })
export class Credential extends BaseSchema {
  @Prop({ required: true, enum: CredentialResource })
  resource!: CredentialResource;

  @Prop({ required: true, enum: CredentialType })
  type!: CredentialType;

  @Prop({ required: false })
  apiKey?: string;

  @Prop({ required: false })
  accessToken?: number;

  @Prop({ required: false, default: null })
  auth?: CredentialBaseAuth;

  @Prop({ required: false, example: 10000 })
  maxToken?: number;

  @Prop({ required: false, example: 2000 })
  useToken?: number;

  @Prop({ type: Object, required: false, default: () => Object.create(null) }, PropType.MAP)
  infoData?: Record<string, any>;

  @Prop({ required: true, enum: CredentialStatus, default: CredentialStatus.ACTIVATED })
  status!: CredentialStatus;
}
