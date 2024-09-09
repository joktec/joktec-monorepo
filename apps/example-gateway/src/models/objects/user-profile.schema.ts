import { Prop, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';
import { UserGender } from '../constants';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserProfile {
  @Prop({ default: null })
  displayName?: string;

  @Prop({ default: null })
  fullName?: string;

  @Prop({ enum: UserGender, default: UserGender.UNKNOWN })
  gender?: UserGender;

  @Prop({ default: null })
  birthday?: Date;

  @Prop({ default: 0 })
  score?: number;

  @Prop({ default: 0 })
  rank?: number;

  @Prop({ default: null })
  @IsCdnUrl()
  coverImage?: string;

  @Prop({ default: null })
  @IsCdnUrl()
  backgroundImage?: string;

  @Prop({ type: [String], default: null })
  hashtags?: string[];

  @Prop({ default: null, maxlength: 30 })
  introduce?: string;

  @Prop({ default: null, maxlength: 100 })
  greeting?: string;

  @Prop({ type: [String], default: [] })
  outLinks?: string[];
}
