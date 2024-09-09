import { Prop, Schema } from '@joktec/mongo';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class ArticleSummary {
  @Prop({ required: true, default: 0 })
  like!: number;

  @Prop({ required: true, default: 0 })
  view!: number;

  @Prop({ required: true, default: 0 })
  share!: number;

  @Prop({ required: true, default: 0 })
  download!: number;

  @Prop({ required: true, default: 0 })
  comment!: number;
}
