import { Prop, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';
import { AuthProviderType } from '../constants';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserProvider {
  @Prop({ required: true, enum: AuthProviderType })
  type!: AuthProviderType;

  @Prop({ required: true })
  providerId!: string;

  @Prop({ default: null })
  verifiedAt?: Date;

  @Prop({ default: null })
  profileName?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  profileImage?: string;
}
