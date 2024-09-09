import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  BaseController,
  BaseValidationPipe,
  Body,
  ClientProxy,
  Controller,
  Get,
  IControllerProps,
  Inject,
  LoggedUser,
  Patch,
  Post,
  QueryParam,
  UseInterceptors,
  UsePipes,
} from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { TRANSPORT } from '../../app.constant';
import { AuthGuard, Instances, RoleGuard, SuccessResponse } from '../../common';
import { ArticleType } from '../../models/constants';
import { Article, User } from '../../models/schemas';
import { ArticleService } from './article.service';
import { ExistArticleInterceptor } from './hooks';
import { ArticleCreateDto, ArticleShareDto, ArticleViewDto } from './models';
import { ArticleFilterCardDto } from './models/article-filter.dto';
import { ArticlePaginationDto, UserLikedPaginationDto } from './models/article-response.dto';

const props: IControllerProps<Article> = {
  dto: Article,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
};

@Controller('articles')
export class ArticleController extends BaseController<Article, string>(props) {
  constructor(
    protected articleService: ArticleService,
    @Inject(TRANSPORT.PROXY.USER) private userClient: ClientProxy,
  ) {
    super(articleService);
  }

  @Get('/feeds')
  @ApiOperation({ summary: `List home feed` })
  @ApiOkResponse({ type: ArticlePaginationDto })
  async homeFeed(
    @QueryParam() query: IMongoRequest<Article>,
    @LoggedUser() loggedUser: User,
  ): Promise<ArticlePaginationDto> {
    const res = await this.articleService.homeFeed(query, loggedUser, true);
    if (query.keyword && query.page === 1) {
      const eventData = { userId: loggedUser._id, keyword: query.keyword, type: ArticleType.FEED };
      this.userClient.emit({ cmd: 'User.logKeyword' }, eventData);
    }
    return res;
  }

  @Get('/cards')
  @ApiOperation({ summary: `List photo card` })
  @ApiOkResponse({ type: ArticlePaginationDto })
  async photoCard(
    @QueryParam() query: ArticleFilterCardDto,
    @LoggedUser() loggedUser: User,
  ): Promise<ArticlePaginationDto> {
    const res = await this.articleService.photoCard(query);
    if (query.keyword && query.page === 1) {
      const eventData = { userId: loggedUser._id, keyword: query.keyword, type: ArticleType.CARD };
      this.userClient.emit({ cmd: 'User.logKeyword' }, eventData);
    }
    return res;
  }

  @Get('/recommend')
  @ApiOperation({ summary: `List Recommend` })
  @ApiOkResponse({ type: ArticlePaginationDto })
  async recommend(@LoggedUser() loggedUser: User): Promise<ArticlePaginationDto> {
    return this.articleService.recommend(loggedUser);
  }

  @Get('/my')
  @ApiOperation({ summary: `My list article` })
  @ApiOkResponse({ type: ArticlePaginationDto })
  async myArticles(
    @QueryParam() query: IMongoRequest<Article>,
    @LoggedUser() loggedUser: User,
  ): Promise<ArticlePaginationDto> {
    return this.articleService.myArticles(query, loggedUser);
  }

  @Get('/my-liked')
  @ApiOperation({ summary: `My liked articles` })
  @ApiOkResponse({ type: ArticlePaginationDto })
  @UseInterceptors(ExistArticleInterceptor)
  async myLikeArticles(@QueryParam() query: IMongoRequest<Article>): Promise<ArticlePaginationDto> {
    return this.articleService.myLikeArticles(query);
  }

  @Get('/:id/liked')
  @ApiOperation({ summary: `Get users liked article` })
  @ApiOkResponse({ type: UserLikedPaginationDto })
  @ApiParam({ name: 'id' })
  @UseInterceptors(ExistArticleInterceptor)
  async getLiked(
    @QueryParam() query: IMongoRequest<User>,
    @Instances() instances: any[],
    @LoggedUser() loggedUser: User,
  ): Promise<UserLikedPaginationDto> {
    if (query.condition['id']) delete query.condition['id'];
    return this.articleService.getLikedUsers(query, instances[0], loggedUser);
  }

  @Post('/:id/download')
  @ApiOperation({ summary: `Download photo card` })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ArticleCreateDto })
  @ApiOkResponse({ type: Article })
  @UseInterceptors(ExistArticleInterceptor)
  async download(
    @Body() body: ArticleCreateDto,
    @Instances() instances: any[],
    @LoggedUser() loggedUser: User,
  ): Promise<Article> {
    return this.articleService.download(body, instances[0], loggedUser);
  }

  @Post('/view')
  @ApiOperation({ summary: `View Article` })
  @ApiOkResponse({ type: SuccessResponse })
  @ApiBody({ type: ArticleViewDto })
  @UsePipes(new BaseValidationPipe())
  async view(@Body() body: ArticleViewDto, @LoggedUser() loggedUser: User): Promise<SuccessResponse> {
    return this.articleService.view(body, loggedUser);
  }

  @Patch('/:id/like')
  @ApiOperation({ summary: `Like Article` })
  @ApiOkResponse({ type: Article })
  @ApiParam({ name: 'id' })
  @UseInterceptors(ExistArticleInterceptor)
  async like(@Instances() instances: any[], @LoggedUser() loggedUser: User): Promise<Article> {
    return this.articleService.like(instances[0], loggedUser);
  }

  @Patch('/:id/unlike')
  @ApiOperation({ summary: `Unlike Article` })
  @ApiOkResponse({ type: Article })
  @ApiParam({ name: 'id' })
  @UseInterceptors(ExistArticleInterceptor)
  async unlike(@Instances() instances: any[], @LoggedUser() loggedUser: User): Promise<Article> {
    return this.articleService.unlike(instances[0], loggedUser);
  }

  @Post('/:id/share')
  @ApiOperation({ summary: `Share Article` })
  @ApiOkResponse({ type: Article })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ArticleShareDto })
  @UseInterceptors(ExistArticleInterceptor)
  @UsePipes(new BaseValidationPipe())
  async share(
    @Body() body: ArticleShareDto,
    @Instances() instances: any[],
    @LoggedUser() loggedUser: User,
  ): Promise<Article> {
    return this.articleService.share(body, instances[0], loggedUser);
  }
}
