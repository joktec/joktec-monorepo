import { IMongoRequest } from '@joktec/mongo';
import { Article } from '../../../models/schemas';

export enum PopularType {
  RECENT = 'recent',
  TODAY = 'today',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface ArticleFilterCardDto extends IMongoRequest<Article> {
  popular?: PopularType;
}
