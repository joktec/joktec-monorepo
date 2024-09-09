import { Prop, Schema } from '@joktec/mongo';
import { UserConfigNotifyType } from '../constants';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class UserConfigNotify {
  static init(): UserConfigNotify[] {
    return Object.values(UserConfigNotifyType).map(value => {
      const cfg = new UserConfigNotify();
      cfg.type = value;
      cfg.activated = true;
      cfg.lastAllowedAt = new Date();
      cfg.lastDeniedAt = null;
      return cfg;
    });
  }

  @Prop({ required: true, enum: UserConfigNotifyType })
  type!: UserConfigNotifyType;

  @Prop({ required: true, default: true })
  activated!: boolean;

  @Prop({ required: false, default: null })
  lastAllowedAt?: Date;

  @Prop({ required: false, default: null })
  lastDeniedAt?: Date;
}
