import { ApiPropertyOptional, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional } from '@joktec/core';
import { prop, PropType, Schema } from '@joktec/mongo';

export enum CoordinateType {
  POINT = 'Point',
}

export type Coordinates = [number, number];

@Schema({ schemaOptions: { _id: false, timestamps: false } })
export class Location {
  @prop()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Full address get from google map' })
  title?: string;

  @prop({ required: true, enum: CoordinateType, default: CoordinateType.POINT })
  @IsNotEmpty()
  @IsEnum(CoordinateType)
  @ApiPropertyOptional({ enum: CoordinateType, example: CoordinateType.POINT })
  type: CoordinateType = CoordinateType.POINT;

  @prop({ type: () => Number }, PropType.ARRAY)
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiPropertyOptional({ type: Number, isArray: true, example: [106.62965, 10.82302] })
  coordinates!: Coordinates;
}
