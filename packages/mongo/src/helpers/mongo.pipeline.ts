import { ICondition, INear, IPopulate, ISort, toInt } from '@joktec/core';
import { getModelWithString, ReturnModelType } from '@typegoose/typegoose';
import { isEmpty } from 'lodash';
import { PipelineStage } from 'mongoose';
import { MongoSchema, QueryHelper } from '../models';
import { MongoHelper } from './mongo.helper';

export class MongoPipeline {
  static match(condition: ICondition<any>): PipelineStage.Match['$match'] {
    return MongoHelper.parseFilter(condition);
  }

  static search(keyword: string): PipelineStage.Match['$match'] {
    return { $text: { $search: keyword } };
  }

  static near(near: INear<any>): PipelineStage.GeoNear['$geoNear'][] {
    return Object.keys(near).map(path => {
      const { lat, lng, distance } = near[path];
      return {
        distanceField: `${path}Distance`,
        near: { type: 'Point', coordinates: [lng, lat] },
        maxDistance: toInt(distance, 1000),
        query: {
          [path]: {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [lng, lat],
              },
              $maxDistance: toInt(distance, 1000),
            },
          },
        },
      };
    });
  }

  static sort(sort: ISort<any>): PipelineStage.Sort['$sort'] {
    return MongoHelper.parseSort(sort);
  }

  static projection(
    select: string | string[] | Record<string, number | boolean | object>,
  ): PipelineStage.Project['$project'] {
    return MongoHelper.parseProjection(select);
  }

  static lookup(populate: IPopulate, model: ReturnModelType<typeof MongoSchema, QueryHelper<any>>): PipelineStage[] {
    const populateOptions = MongoHelper.parsePopulate(populate);
    return populateOptions.flatMap(populate => {
      const { path, options } = model.schema.virtuals[populate.path];
      const { ref, foreignField, localField, justOne } = options;

      const refCollection = getModelWithString(ref).collection.collectionName;
      const lookup: PipelineStage.Lookup['$lookup'] = {
        from: refCollection,
        localField: localField,
        foreignField: foreignField,
        as: path,
      };

      const subPipelines: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[] = [];
      if (!isEmpty(populate.match)) subPipelines.push({ $match: populate.match });
      if (populate.select) subPipelines.push({ $project: populate.select });
      if (subPipelines.length) lookup.pipeline = subPipelines;

      const pipelines: PipelineStage[] = [{ $lookup: lookup }];
      if (justOne) pipelines.push({ $addFields: { [path]: { $arrayElemAt: [`$${path}`, 0] } } });

      return pipelines;
    });
  }
}
