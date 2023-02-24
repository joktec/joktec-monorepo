import { modelOptions, ObjectId, prop } from '@joktec/mongo';

@modelOptions({ schemaOptions: { collection: 'categories', timestamps: false } })
export class Category {
  @prop({ auto: true, immutable: true })
  _id?: ObjectId;

  @prop({ type: String, required: true, minlength: 10, maxlength: 255 })
  name!: string;
}
