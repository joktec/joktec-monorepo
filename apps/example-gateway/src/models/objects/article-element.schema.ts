import { Prop, Schema } from '@joktec/mongo';
import { IsCdnUrl } from '../../utils';

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class ArticleElementMatrix {
  @Prop({ required: true, default: 0 })
  scale!: number;

  @Prop({ required: true, default: 0 })
  rotate!: number;
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class ArticleElementText {
  @Prop({ required: true, default: '' })
  fontFamily!: string;

  @Prop({ required: true, default: 0 })
  fontSize!: number;

  @Prop({ required: true, default: 0 })
  fontWeight!: number;

  @Prop({ required: true, default: '' })
  text!: string;

  @Prop({ required: true, default: '' })
  color!: string;

  @Prop({ required: true, default: '' })
  textAlign!: string;

  @Prop({ required: true, default: 0 })
  lineHeight!: number;
}

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class ArticleElement {
  @Prop({ required: true, default: 0 })
  type: number;

  @Prop({ required: true, default: [] })
  matrix_4!: number[];

  @Prop({ default: '' })
  @IsCdnUrl()
  url?: string;

  @Prop({ required: true, default: 0 })
  width!: number;

  @Prop({ default: 0 })
  height?: number;

  @Prop({ default: true })
  isEdit!: boolean;

  @Prop({ type: ArticleElementMatrix, default: null })
  matrixImageModel?: ArticleElementMatrix;

  @Prop({ type: ArticleElementText, default: null })
  text?: ArticleElementText;
}
