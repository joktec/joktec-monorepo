import { Prop, PropType, Schema } from '@joktec/mongo';
import { BaseSchema } from '../common';
import { DataLogLevel } from '../constants';
import { DataLogRequest } from '../objects';

@Schema({
  collection: 'logs',
  textSearch: 'context,msg',
  index: ['context', 'level'],
  customIndexes: [{ fields: { time: 1 }, options: { expires: '30d' } }],
  paranoid: true,
})
export class DataLog extends BaseSchema {
  @Prop({ type: Date, required: true, example: () => new Date() })
  time!: Date;

  @Prop({ required: true, example: 'GatewayService' })
  context!: string;

  @Prop({ required: true, example: 'develop' })
  environment!: string;

  @Prop({ required: true, example: 'app-api-66b49757bc-9984l' })
  hostname!: string;

  @Prop({ required: true, example: 28 })
  pid!: number;

  @Prop({ required: true, enum: DataLogLevel, example: DataLogLevel.INFO })
  level!: DataLogLevel;

  @Prop({ required: true, example: 'Nest application successfully started' })
  msg!: string;

  @Prop({ required: true, example: 'mc-dispatch-app-api' })
  name!: string;

  @Prop({ required: true, example: '1.0.0' })
  version!: string;

  @Prop({ type: DataLogRequest, example: () => new DataLogRequest() })
  req?: DataLogRequest;

  @Prop({ type: Object, example: {} }, PropType.MAP)
  args?: Record<string, any>;

  @Prop({ type: Object, example: {} }, PropType.MAP)
  err?: Record<string, any>;
}
