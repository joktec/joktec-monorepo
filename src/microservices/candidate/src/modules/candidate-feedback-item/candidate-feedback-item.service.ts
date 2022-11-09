import {
  CandidateFeedbackItem,
  CandidateFeedbackItemDocument,
} from './schemas/candidate-feedback-item.schema';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  ICustomConditionQuery,
} from '@jobhopin/core';
import { CandidateFeedbackItemContentService } from '../candidate-feedback-item-content/candidate-feedback-item-content.service';
import { CandidateFeedbackGroupService } from '../candidate-feedback-group/candidate-feedback-group.service';
import { CandidateFeedbackGroupContentService } from '../candidate-feedback-group-content/candidate-feedback-group-content.service';

@Injectable()
export class CandidateFeedbackItemService extends BaseService<CandidateFeedbackItemDocument> {
  constructor(
    @InjectModel(CandidateFeedbackItem.name)
    private candidateModel: Model<CandidateFeedbackItemDocument>,

    private candidateFeedbackItemContentService: CandidateFeedbackItemContentService,
    private candidateFeedbackGroupService: CandidateFeedbackGroupService,
    private candidateFeedbackGroupContentService: CandidateFeedbackGroupContentService,
  ) {
    super(candidateModel);
  }

  async query(
    condition: BaseConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    try {
      const { items: candidateFeedbackItem } = await super.query(
        condition,
        pagination,
        customCondition,
      );

      const candidateFeedbackItemId = candidateFeedbackItem.map(
        (item) => item._id,
      );

      const candidateFeedbackGroupId = candidateFeedbackItem.map((item) => ({
        group: item.group,
        itemId: item._id,
      }));

      const candidateFeedbackItemContents =
        await this.candidateFeedbackItemContentService.findAllCustom({
          candidatefeedbackitem: {
            $in: candidateFeedbackItemId,
          },
        });

      const candidateFeedbackGroups =
        await this.candidateFeedbackGroupService.findAllCustom();

      const candidateFeedbackGroupContents =
        await this.candidateFeedbackGroupContentService.findAllCustom();

      let group = candidateFeedbackGroupId.map((item) => {
        const candidateFG = candidateFeedbackGroups.find(
          (it) => it._id === item.group,
        );

        return {
          feedbackItemId: item.itemId,
          id: candidateFG._id,
          name: candidateFG.name,
        };
      });

      group = group.map((item) => ({
        ...item,
        locales: candidateFeedbackGroupContents
          .filter((it) => item.id === it.candidatefeedbackgroup)
          .reduce((locales, item) => {
            if (item.lang === 'vi') return { ...locales, vi: item.title };
            return { ...locales, en: item.title };
          }, {}),
      }));

      const data = candidateFeedbackItem.map((item) => ({
        ...item,
        group: group.find((it) => it.feedbackItemId === item._id),
        locales: candidateFeedbackItemContents
          .filter((it) => item._id === it.candidatefeedbackitem)
          .reduce((locales, item) => {
            if (item.lang === 'vi') return { ...locales, vi: item.title };
            return { ...locales, en: item.title };
          }, {}),
      }));

      return { items: data };
    } catch (error) {
      console.log(error);
    }
  }
}
