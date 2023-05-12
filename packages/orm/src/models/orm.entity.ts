import { ApiHideProperty, ApiProperty, Exclude, Field, generateUUID, Type } from '@joktec/core';
import { BaseEntity as MikroEntity, Entity, PrimaryKey, Property, types } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { isBoolean } from 'lodash';

export type IDType = number | string | ObjectId;

export enum PrimaryKeyType {
  INCREMENT,
  UUID,
  OBJECT_ID,
}

export type IBaseEntityProps = {
  primary?: { name?: string; type?: PrimaryKeyType; defaultFn?: Function };
  timestamp?: boolean | { createdAt?: string; updatedAt?: string };
  author?: boolean | { createdBy?: string; updatedBy?: string };
  paranoid?: boolean | { deletedAt?: string; deletedBy?: string };
};

export const BaseEntity = <T extends object, ID extends IDType = number, U_ID extends IDType = ID>(
  props: IBaseEntityProps = {
    timestamp: true,
    author: true,
    paranoid: false,
    primary: { name: '_id', type: PrimaryKeyType.INCREMENT },
  },
) => {
  abstract class EntityClass extends MikroEntity<EntityClass, '_id'> {
    _id?: ID;
    createdAt?: Date;
    createdBy?: U_ID;
    updatedAt?: Date;
    updatedBy?: U_ID;
    deletedAt?: Date;
    deletedBy?: U_ID;
  }

  const { name, type } = props.primary;
  if (type === PrimaryKeyType.UUID) {
    const defaultFn: Function = props.primary.defaultFn || generateUUID;
    PrimaryKey({ name: name, type: types.uuid, onCreate: () => defaultFn })(Entity.prototype, '_id');
    Type(() => String)(Entity.prototype, '_id');
    ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })(Entity.prototype, '_id');
    Field(() => String, { nullable: true })(Entity.prototype, '_id');
  } else if (type === PrimaryKeyType.OBJECT_ID) {
    PrimaryKey({ name: name, type: 'ObjectId' })(Entity.prototype, '_id');
    Type(() => String)(Entity.prototype, '_id');
    ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })(Entity.prototype, '_id');
    Field(() => String, { nullable: true })(Entity.prototype, '_id');
  } else {
    PrimaryKey({ name: name, autoincrement: true, type: types.integer })(Entity.prototype, '_id');
    Type(() => Number)(Entity.prototype, '_id');
    ApiProperty({ type: Number, example: 1 })(Entity.prototype, '_id');
    Field(() => Number, { nullable: true })(Entity.prototype, '_id');
  }

  if (props.timestamp) {
    const createdAt = isBoolean(props.timestamp) ? 'createdAt' : props.timestamp.createdAt || 'createdAt';
    Property({ name: createdAt, onCreate: () => new Date() })(Entity.prototype, 'createdAt');
    ApiProperty({ type: Date, example: new Date() })(Entity.prototype, 'createdAt');
    Field(() => Date, { nullable: true })(Entity.prototype, 'createdAt');

    const updatedAt = isBoolean(props.timestamp) ? 'updatedAt' : props.timestamp.updatedAt || 'updatedAt';
    Property({ name: updatedAt, onUpdate: () => new Date() })(Entity.prototype, 'updatedAt');
    ApiProperty({ type: Date, example: new Date() })(Entity.prototype, 'updatedAt');
    Field(() => Date, { nullable: true })(Entity.prototype, 'updatedAt');
  }

  if (props.author) {
    const createdBy = isBoolean(props.author) ? 'createdBy' : props.author.createdBy || 'createdBy';
    Property({ name: createdBy, default: null, nullable: true })(Entity.prototype, 'createdBy');
    ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })(Entity.prototype, 'createdBy');
    Field(() => String, { nullable: true })(Entity.prototype, 'createdBy');
    Type(() => String)(Entity.prototype, 'createdBy');

    const updatedBy = isBoolean(props.author) ? 'updatedBy' : props.author.updatedBy || 'updatedBy';
    Property({ name: updatedBy, default: null, nullable: true })(Entity.prototype, 'updatedBy');
    ApiProperty({ type: String, example: '507f1f77bcf86cd799439011' })(Entity.prototype, 'updatedBy');
    Field(() => String, { nullable: true })(Entity.prototype, 'updatedBy');
    Type(() => String)(Entity.prototype, 'updatedBy');
  }

  if (props.paranoid) {
    const deletedAt = isBoolean(props.paranoid) ? 'deletedAt' : props.paranoid.deletedAt || 'deletedAt';
    Property({ name: deletedAt, default: null, nullable: true })(Entity.prototype, 'deletedAt');
    ApiHideProperty()(Entity.prototype, 'deletedAt');
    Exclude({ toPlainOnly: true })(Entity.prototype, 'deletedAt');

    const deletedBy = isBoolean(props.paranoid) ? 'deletedBy' : props.paranoid.deletedBy || 'deletedBy';
    Property({ name: deletedBy, default: null, nullable: true })(Entity.prototype, 'deletedBy');
    ApiHideProperty()(Entity.prototype, 'deletedBy');
    Exclude({ toPlainOnly: true })(Entity.prototype, 'deletedBy');
    Type(() => String)(Entity.prototype, 'deletedBy');
  }

  return EntityClass;
};
