import { Injectable, LogService } from '@joktec/core';
import { CronExpression, Crontab, CrontabTz } from '@joktec/cron';
import { ArticleStatus, EmotionType } from '../../models/constants';
import { Article } from '../../models/schemas';
import { ArticleRepo, CommentRepo, EmotionRepo } from '../../repositories';

@Injectable()
export class ArticleCronner {
  constructor(
    private logService: LogService,
    private articleRepo: ArticleRepo,
    private emotionRepo: EmotionRepo,
    private commentRepo: CommentRepo,
  ) {
    this.logService.setContext(ArticleCronner.name);
  }

  @Crontab(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    title: 'Every midnight will calculate article summary',
    timezone: CrontabTz['Asia/Seoul'],
  })
  async summary() {
    const articles = await this.articleRepo.find({ condition: { status: ArticleStatus.ACTIVATED } });
    for (const article of articles) {
      const [like, share, view, download, comment] = await Promise.all([
        this.emotionRepo.count({ condition: { target: Article.name, targetId: article._id, type: EmotionType.LIKE } }),
        this.emotionRepo.count({ condition: { target: Article.name, targetId: article._id, type: EmotionType.SHARE } }),
        this.emotionRepo.count({ condition: { target: Article.name, targetId: article._id, type: EmotionType.VIEW } }),
        this.emotionRepo.count({
          condition: { target: Article.name, targetId: article._id, type: EmotionType.DOWNLOAD },
        }),
        this.commentRepo.count({ condition: { articleId: article._id } }),
      ]);
      await this.articleRepo.update(article._id, { summary: { like, share, view, download, comment } });
    }
    return { success: true, message: `Update ${articles.length} articles` };
  }
}
