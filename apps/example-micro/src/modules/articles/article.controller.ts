import { ClientController, Controller, EventPattern, IMicroControllerProps, Payload, Transport } from '@joktec/core';
import { SuccessResponse } from '../../common';
import { Article } from '../../models/schemas';
import { ArticleService } from './article.service';
import { ArticleViewDto } from './models';

const props: IMicroControllerProps<Article> = {
  dto: Article,
  transport: Transport.REDIS,
};

@Controller('articles')
export class ArticleController extends ClientController<Article, string>(props) {
  constructor(protected articleService: ArticleService) {
    super(articleService);
  }

  @EventPattern({ cmd: `Article.summary` }, Transport.REDIS)
  async summary(@Payload('article') article: Article, @Payload('action') action?: string): Promise<SuccessResponse> {
    return this.articleService.summary(article, action);
  }

  @EventPattern({ cmd: `Article.view` }, Transport.REDIS)
  async view(
    @Payload('viewData') viewData: ArticleViewDto,
    @Payload('userId') userId: string,
  ): Promise<SuccessResponse> {
    return this.articleService.view(viewData, userId);
  }
}
