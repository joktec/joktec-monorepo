import { Prop, PropType, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class LogRequest {
  @Prop({ required: true, example: '00000000-0000-0000-0000-000000000000' })
  id!: string;

  @Prop({ required: true, example: 'GET' })
  method!: string;

  @Prop({ required: true, example: '/users' })
  url!: string;

  @Prop({ type: Object, required: false }, PropType.MAP)
  query?: Record<string, any>;

  @Prop({ type: Object, required: false }, PropType.MAP)
  params?: Record<string, any>;

  @Prop({ type: Object, required: false }, PropType.MAP)
  body?: Record<string, any>;

  @Prop({ type: Object, required: false }, PropType.MAP)
  headers?: Record<string, any>;

  @Prop({ required: true, example: '::ffff:10.0.75.217' })
  remoteAddress!: string;

  @Prop({ required: true, example: 41190 })
  remotePort!: number;
}
