import { Prop, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class OrderTimeline {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ trim: true, default: '' })
  subhead?: string;

  @Prop({ default: null, trim: true })
  @IsCdnUrl()
  link?: string;
}
