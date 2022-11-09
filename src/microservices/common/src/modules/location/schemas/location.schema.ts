import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { NAME } from '../location.constants';
import { LocationType } from '@app/modules/location-type/schemas/location-type.schema';

export type LocationDocument = Location & CustomMongooseDocument;

@Schema({ collection: NAME })
export class Location {
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  code: string;
  @Prop({
    type: String,
    required: true,
  })
  name: string;
  @Prop()
  nameEn: string;

  @Prop({
    type: String,
    required: true,
  })
  shortName: string;
  @Prop()
  shortNameEn: string;

  @Prop({
    type: String,
  })
  slug: string;

  @Prop({
    type: Number,
    default: 0,
  })
  priority: number;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
  })
  imageHighlight: string;

  @Prop({
    type: String,
    ref: 'LocationType',
  })
  locationType: LocationType;

  @Prop({
    type: String,
  })
  imageKyc: string;

  @Prop({
    type: Number,
  })
  defaultDistrict: number;

  @Prop({
    type: String,
  })
  askLocationSelectionImage: string;

  @Prop({
    type: Number,
  })
  isActiveAskLocation: number;

  @Prop({
    type: Number,
  })
  parentId: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
