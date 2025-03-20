import { BaseService, Injectable } from '@joktec/core';
import { toInt } from '@joktec/utils';
import { groupBy } from 'lodash';
import { SuccessResponse } from '../../common';
import { EmotionType } from '../../models/constants';
import { Article, Emotion } from '../../models/schemas';
import { ArticleRepo, CommentRepo, EmotionRepo } from '../../repositories';
import { ArticleViewDto } from './models';

@Injectable()
export class ArticleService extends BaseService<Article, string> {
  private readonly queue: Array<() => Promise<void>> = [];

  constructor(
    protected articleRepo: ArticleRepo,
    private emotionRepo: EmotionRepo,
    private commentRepo: CommentRepo,
  ) {
    super(articleRepo);
    setTimeout(() => this.updateArticleView(), 10000);
  }

  async summary(article: Article, action?: string): Promise<SuccessResponse> {
    if (action === 'like') {
      const like = await this.emotionRepo.count({
        condition: { target: Article.name, targetId: article._id, type: EmotionType.LIKE },
      });
      await this.articleRepo.update(article._id, { $set: { 'summary.like': like } });
    }

    if (action === 'share') {
      const share = await this.emotionRepo.count({
        condition: { target: Article.name, targetId: article._id, type: EmotionType.SHARE },
      });
      await this.articleRepo.update(article._id, { $set: { 'summary.share': share } });
    }

    if (action === 'download') {
      const download = await this.emotionRepo.count({
        condition: { target: Article.name, targetId: article._id, type: EmotionType.DOWNLOAD },
      });
      await this.articleRepo.update(article._id, { $set: { 'summary.download': download } });
    }

    if (action === 'comment') {
      const comment = await this.commentRepo.count({ condition: { articleId: article._id } });
      await this.articleRepo.update(article._id, { $set: { 'summary.comment': comment } });
    }

    return { success: true };
  }

  async view(viewData: ArticleViewDto, userId: string): Promise<SuccessResponse> {
    const insertEmotions = viewData.viewItems.map(item => {
      const payload: Partial<Emotion> = {
        type: EmotionType.VIEW,
        target: Article.name,
        authorId: userId,
        targetId: item.articleId,
        actionAt: item.actionAt,
      };
      return payload;
    });
    await this.emotionRepo.insertMany(insertEmotions);

    const articleById = groupBy(viewData.viewItems, 'articleId');
    const docs = Object.keys(articleById).map(articleId => {
      const totalViewOfEach = toInt(articleById[articleId]?.length, 0);
      return {
        updateOne: {
          filter: { _id: articleId },
          update: { $inc: { 'summary.view': totalViewOfEach } },
          upsert: false,
        },
      };
    });

    this.queue.push(() => this.articleRepo.bulkWrite(docs));
    return { success: true };
  }

  async updateArticleView() {
    if (this.queue.length) {
      try {
        const task = this.queue.shift();
        await task();
      } catch (err) {
        this.logService.error(err, 'updateArticleView error');
      }
    }
    setTimeout(this.updateArticleView.bind(this), 5000);
  }
}
