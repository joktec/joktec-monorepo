import { toArray } from '@joktec/core';
import dot from 'dot-object';
import { get } from 'lodash';
import mongoose, { PipelineStage, PopulateOptions, Schema } from 'mongoose';
import { MongoHelper } from '../helpers';

type IPopulateOptions = string | PopulateOptions;

function combinePopulateMatch(
  populates: IPopulateOptions | IPopulateOptions[],
  virtualMatch: object,
): PopulateOptions[] {
  return toArray<IPopulateOptions>(populates).map<PopulateOptions>(populate => {
    if (typeof populate === 'string') {
      populate = { path: populate, match: {} } as PopulateOptions;
    }
    populate.match = Object.assign({}, populate.match, virtualMatch);
    return populate;
  });
}

function cleanUpDocument(doc: any, paths: string[]) {
  const dotDoc = dot.dot(doc);
  for (const key in dotDoc) {
    if (!paths.includes(key)) {
      delete doc[key];
    }
  }
}

export const TransformPlugin = (schema: Schema) => {
  schema.pre('save', function (next) {
    ['_id', '__v', 'createdAt', 'updatedAt', '__t'].map(path => {
      if (this[path]) delete this[path];
    });
    next();
  });

  schema.pre(
    [
      'find',
      'findOne',
      'findOneAndUpdate',
      'countDocuments',
      'estimatedDocumentCount',
      'updateMany',
      'updateOne',
      'deleteOne',
      'findOneAndDelete',
      'deleteMany',
    ],
    { document: false, query: true },
    function (next) {
      // Intercept options
      if (this.getOptions()) {
        const options = this.getOptions();
        if (options.sort) options.sort = MongoHelper.parseSort(options.sort);
        if (options.projection) options.projection = MongoHelper.parseProjection(options.projection as any);
        this.setOptions(options);
      }

      // Intercept filter
      if (this.getFilter()) {
        const newFilter = MongoHelper.parseFilter(this.getFilter());
        this.setQuery(newFilter);
      }

      // Intercept update
      if (this.getUpdate()) {
        const omitKeys = ['_id', '__v', 'createdAt', 'updatedAt', '__t'];
        const newUpdate = MongoHelper.flatten(this.getUpdate(), omitKeys);
        this.setUpdate(newUpdate);
      }

      // Intercept populate
      const populatedPaths = this.getPopulatedPaths();
      if (populatedPaths.length) {
        populatedPaths.forEach(path => {
          const virtual = this.model.schema.virtuals[path];
          const virtualMatch = Object.assign({}, get(virtual, 'options.match'), get(virtual, 'options.options.match'));
          const populateOptions = this.mongooseOptions().populate[path];
          const populates = combinePopulateMatch(populateOptions, virtualMatch);
          this.populate(populates);
        });
      }
      next();
    },
  );

  schema.pre('aggregate', async function (next) {
    const admin = mongoose.connection.db.admin();
    const { version } = await admin.serverStatus();
    const mongoVersion = version.split('.').map(Number);

    const pipelines: PipelineStage[] = [];
    while (this.pipeline().length) pipelines.push(this.pipeline().shift());
    pipelines.map(pipeline => {
      if ('$lookup' in pipeline) {
        if (mongoVersion[0] < 5) {
          const lookupStage = pipeline['$lookup'];
          if (lookupStage.localField && lookupStage.foreignField) {
            pipeline = {
              $lookup: {
                from: lookupStage.from,
                let: { localFieldVar: `$${lookupStage.localField}` },
                pipeline: [{ $match: { $expr: { $eq: [`$${lookupStage.foreignField}`, '$$localFieldVar'] } } }],
                as: lookupStage.as,
              },
            };
          }
        }

        if (!pipeline.$lookup.pipeline?.length) {
          delete pipeline.$lookup.pipeline;
        }
      }
      this.pipeline().push(pipeline);
    });
    next();
  });

  schema.post(/^find/, function (res, next) {
    // const paths = Object.keys(this.model.schema.paths);
    // if (isArray(res)) res.map(doc => cleanUpDocument(doc, paths));
    // else cleanUpDocument(res, paths);
    next();
  });
};
