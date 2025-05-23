import { Injectable } from '@joktec/core';
import { CronExpression, Crontab, CrontabTz } from '@joktec/cron';
import { head } from 'lodash';
import { ArticleFileType, ArticleStatus, ArticleType, ArtistStatus, UserRole } from '../../models/constants';
import { ArticleRepo, ArtistRepo, UserRepo } from '../../repositories';

@Injectable()
export class ArtistCronner {
  constructor(
    private artistRepo: ArtistRepo,
    private articleRepo: ArticleRepo,
    private userRepo: UserRepo,
  ) {}

  @Crontab(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    title: 'Every day at midnight will get the best photo card (most download) and set avatar for this article',
    timezone: CrontabTz['Asia/Seoul'],
  })
  async syncAvatar() {
    const [bizUsers, artists] = await Promise.all([
      this.userRepo.find({ condition: { role: UserRole.BIZ } }),
      this.artistRepo.find({ condition: { status: ArtistStatus.ACTIVATED } }),
    ]);

    for (const artist of artists) {
      const bestArticles = await this.articleRepo.find({
        condition: {
          authorId: { $in: bizUsers.map(user => user._id) },
          artistIds: artist._id as any,
          type: ArticleType.CARD,
          status: ArticleStatus.ACTIVATED,
        },
        sort: { summary: { download: 'desc' }, updatedAt: 'desc' },
      });

      if (!bestArticles.length) continue;
      const files = head(bestArticles).files.filter(f => f.type === ArticleFileType.IMAGE);

      if (!files?.length) continue;
      const url = head(files).url;
      await this.artistRepo.update(artist._id, { avatar: url });
    }

    return { success: true, message: `Update ${artists.length} artists` };
  }
}
