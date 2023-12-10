import { BadRequestException, toArray } from '@joktec/core';
import { getModelWithString } from '@typegoose/typegoose';
import { difference, get, isEmpty, pickBy } from 'lodash';
import mongoose, { Error, Schema } from 'mongoose';

type IRefPath = { path: string; ref: string };

function getRefPath(schema: Schema): IRefPath[] {
  const refPath: IRefPath[] = [];
  Object.values(schema.paths).map(schemaType => {
    const isRefObject =
      schemaType instanceof mongoose.Schema.Types.ObjectId &&
      schemaType.options.ref &&
      schemaType.options.strictRef === true;
    if (isRefObject) {
      refPath.push({ path: schemaType.path, ref: schemaType.options.ref });
    }

    const isArrayRef =
      schemaType instanceof mongoose.Schema.Types.Array &&
      schemaType.caster &&
      schemaType.caster?.options?.ref &&
      schemaType.options.strictRef === true;
    if (isArrayRef) {
      refPath.push({ path: schemaType.path, ref: schemaType.caster?.options?.ref });
    }
  });
  return refPath;
}

function getVirtualPath(schema: Schema) {
  return pickBy(schema.virtuals, (virtual: any) => {
    const strictRef = get(virtual, 'options.strictRef', false);
    const isForeign = get(virtual, 'options.foreignField', '_id') !== '_id';
    return strictRef && isForeign;
  });
}

export const StrictReferencePlugin = (schema: Schema, opts?: { paranoidKey?: string }) => {
  schema.pre('save', async function (next) {
    const refPaths = getRefPath(schema);
    if (!refPaths.length) return next();

    const validation = new Error.ValidationError();
    for (const refPath of refPaths) {
      const insertIds = toArray(this.get(refPath.path));
      if (!insertIds.length) continue;

      const items = await getModelWithString(refPath.ref).find().in('_id', insertIds).exec();
      const storeIds = items.map(item => String(item._id));
      const notExistIds = difference(insertIds, storeIds);
      if (notExistIds.length) {
        const validator = new Error.ValidatorError({
          type: 'strictRef',
          message: `Not found dependent documents in '${refPath.ref}' with path '${refPath.path}'.`,
          path: refPath.path,
          value: notExistIds,
          reason: new BadRequestException('MONGO_REF_EXCEPTION'),
        });
        validation.addError(refPath.path, validator);
      }
    }

    if (!isEmpty(validation.errors)) {
      return next(validation);
    }

    next();
  });

  schema.pre(['findOneAndUpdate', 'findOneAndReplace', 'updateOne', 'updateMany'], async function (next) {
    const paranoidKey = opts?.paranoidKey;
    if (paranoidKey && this.get(paranoidKey)) {
      return next();
    }

    const refPaths = getRefPath(schema);
    if (!refPaths.length) return next();

    const validation = new Error.ValidationError();
    for (const refPath of refPaths) {
      const insertIds = toArray(this.get(refPath.path));
      if (!insertIds.length) continue;

      const items = await getModelWithString(refPath.ref).find().in('_id', insertIds).exec();
      const storeIds = items.map(item => String(item._id));
      const notExistIds = difference(insertIds, storeIds);
      if (notExistIds.length) {
        const validator = new Error.ValidatorError({
          type: 'strictRef',
          message: `Not found dependent documents in '${refPath.ref}' with path '${refPath.path}'.`,
          path: refPath.path,
          value: notExistIds,
          reason: new BadRequestException('MONGO_REF_EXCEPTION'),
        });
        validation.addError(refPath.path, validator);
      }
    }

    if (!isEmpty(validation.errors)) {
      return next(validation);
    }

    next();
  });

  schema.pre(
    ['findOneAndUpdate', 'updateMany', 'updateOne', 'findOneAndDelete', 'deleteMany', 'deleteOne'],
    async function (next) {
      const paranoidKey = opts?.paranoidKey;
      if (paranoidKey && this.get(paranoidKey)) {
        return next();
      }

      const virtualPath = getVirtualPath(schema);
      if (isEmpty(virtualPath)) return next();

      const items = await getModelWithString(this.model.modelName)
        .find(this.getFilter(), '_id', this.getOptions())
        .exec();
      if (!items.length) return next();

      const validation = new Error.ValidationError();
      for (const [path, virtual] of Object.entries(virtualPath)) {
        const { ref, foreignField } = get(virtual as any, 'options', {});
        const query = { [foreignField]: { $in: items.map(item => item._id) } };
        const dependentDocuments = await getModelWithString(ref).find(query, '_id').exec();
        if (dependentDocuments.length > 0) {
          const validator = new Error.ValidatorError({
            type: 'strictRef',
            message: `Cannot delete: ${dependentDocuments.length} dependent documents in '${ref}' with path '${path}'.`,
            path: path,
            value: dependentDocuments.map(doc => doc._id),
            reason: new BadRequestException('MONGO_REF_EXCEPTION'),
          });
          validation.addError(path, validator);
        }
      }

      if (!isEmpty(validation.errors)) {
        return next(validation);
      }

      next();
    },
  );
};
