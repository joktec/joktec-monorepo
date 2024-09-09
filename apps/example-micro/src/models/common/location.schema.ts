import { Prop, Schema } from '@joktec/mongo';

export enum CoordinateType {
  POINT = 'Point',
}

export type Coordinates = [number, number];

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class LocationSchema {
  @Prop({ example: 'Full address get from google map' })
  title?: string;

  @Prop({ required: true, enum: CoordinateType, default: CoordinateType.POINT })
  type: CoordinateType = CoordinateType.POINT;

  @Prop({ type: [Number], example: [106.62965, 10.82302] })
  coordinates!: Coordinates;
}
