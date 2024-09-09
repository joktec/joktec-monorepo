import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@joktec/core';
import { Observable } from 'rxjs';
import { IRequest } from '../../../app.constant';
import { Article } from '../../../models/schemas';
import { ArticleRepo } from '../../../repositories';

@Injectable()
export class ExistArticleInterceptor implements NestInterceptor<Article, Article> {
  constructor(private articleRepo: ArticleRepo) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<IRequest<Article>>();
    if (!req.instances) req.instances = [];
    if (req.params.id) {
      const article = await this.articleRepo.findById(req.params.id);
      if (!article) throw new NotFoundException('article.NOT_FOUND');
      req.instances.push(article);
    }
    return next.handle();
  }
}
