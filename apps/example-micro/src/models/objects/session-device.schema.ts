import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class SessionDevice {
  @Prop({})
  deviceId?: string;

  @Prop({})
  deviceModel?: string;

  @Prop({})
  deviceOs?: string;

  @Prop({})
  osVersion?: string;
}
