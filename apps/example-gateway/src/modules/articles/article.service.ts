import {
  BadRequestException,
  BaseService,
  ClientProxy,
  generateUUID,
  IBaseRequest,
  Inject,
  Injectable,
  IPaginationResponse,
  NotFoundException,
  REQUEST,
} from '@joktec/core';
import { IMongoRequest } from '@joktec/mongo';
import { last, map, omit, pick } from 'lodash';
import moment from 'moment-timezone';
import { IRequest, TRANSPORT } from '../../app.constant';
import { SuccessResponse } from '../../common';
import { ArticleStatus, ArticleType, EmotionType, UserStatus } from '../../models/constants';
import { Article, User } from '../../models/schemas';
import { ArticleRepo, BlockRepo, EmotionRepo, UserRepo } from '../../repositories';
import { ArticleCreateDto, ArticleShareDto, ArticleViewDto } from './models';
import { ArticleFilterCardDto, PopularType } from './models/article-filter.dto';
import { ArticlePaginationDto, UserLiked, UserLikedPaginationDto } from './models/article-response.dto';

@Injectable()
export class ArticleService extends BaseService<Article, string> {
  constructor(
    protected articleRepo: ArticleRepo,
    private emotionRepo: EmotionRepo,
    private blockRepo: BlockRepo,
    private userRepo: UserRepo,
    @Inject(TRANSPORT.PROXY.ARTICLE) private articleClient: ClientProxy,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(articleRepo);
  }

  async paginate(query: IBaseRequest<Article>): Promise<IPaginationResponse<Article>> {
    return super.paginate(query);
  }

  async homeFeed(query: IMongoRequest<Article>, loggedUser: User, viewed: boolean): Promise<ArticlePaginationDto> {
    const [bizUsers, blocks] = await Promise.all([
      this.userRepo.findBizUsers(),
      this.blockRepo.findArticleBlock(loggedUser._id),
    ]);
    const select = ['_id', 'title', 'description', 'createdAt', 'type', 'postedAt', 'summary', 'authorId'];
    const fileSelect = ['files._id', 'files.type', 'files.url', 'files.preview', 'files.ratio'];
    const processQuery: IMongoRequest<Article> = {
      ...query,
      condition: {
        ...query.condition,
        authorId: { $in: bizUsers.map(user => user._id) },
        _id: { $nin: map(blocks, block => String(block.targetId)) },
        type: ArticleType.FEED,
        status: ArticleStatus.ACTIVATED,
      },
      sort: { ...query.sort, postedAt: 'desc' },
      populate: { author: { select: ['_id', 'avatar', 'email', 'nickname'] } },
      select: [...select, ...fileSelect] as any,
    };

    if (processQuery.keyword) {
      processQuery.condition.description = { $regex: processQuery.keyword, $options: 'i' } as any;
      delete processQuery.keyword;
    }

    if (viewed) {
      const { items, total } = await this.articleRepo.homeFeed(processQuery, loggedUser);
      return this.transformPaginate(items, total, query);
    }

    const res = await super.paginate(processQuery);
    const emotions = await this.emotionRepo.find({
      condition: {
        authorId: loggedUser._id,
        targetId: { $in: res.items.map(item => item._id) },
        target: Article.name,
        type: EmotionType.LIKE,
      },
    });

    return {
      ...res,
      items: res.items.map(item => {
        return Object.assign(item, {
          isLiked: emotions.some(e => String(e.targetId) === item._id),
        });
      }),
    };
  }

  async photoCard(query: ArticleFilterCardDto): Promise<ArticlePaginationDto> {
    const bizUsers = await this.userRepo.findBizUsers();
    const select = ['_id', 'title', 'description', 'createdAt', 'type', 'postedAt', 'summary', 'authorId'];
    const fileSelect = ['files._id', 'files.type', 'files.url', 'files.preview', 'files.ratio'];
    const processQuery: IMongoRequest<Article> = {
      ...query,
      condition: {
        ...query.condition,
        authorId: { $in: bizUsers.map(user => user._id) },
        type: ArticleType.CARD,
      },
      sort: { ...query.sort, postedAt: 'desc' },
      populate: { author: { select: ['_id', 'avatar', 'email', 'nickname'] } },
      select: [...select, ...fileSelect] as any,
    };

    if (processQuery.keyword) {
      processQuery.condition.description = { $regex: processQuery.keyword, $options: 'i' } as any;
      delete processQuery.keyword;
    }

    const today = moment().tz(this.request.timezone);

    if (query.popular === PopularType.TODAY) {
      processQuery.condition.updatedAt = {
        $gte: today.clone().startOf('days').toDate(),
        $lte: today.clone().endOf('days').toDate(),
      };
      processQuery.sort = { summary: { download: 'desc' }, updatedAt: 'desc', ...processQuery.sort };
    }

    if (query.popular === PopularType.WEEKLY) {
      processQuery.condition.updatedAt = {
        $gte: today.clone().startOf('days').subtract(1, 'weeks').toDate(),
        $lte: today.clone().endOf('days').toDate(),
      };
      processQuery.sort = { summary: { download: 'desc' }, updatedAt: 'desc', ...processQuery.sort };
    }

    if (query.popular === PopularType.MONTHLY) {
      processQuery.condition.updatedAt = {
        $gte: today.clone().startOf('days').subtract(1, 'months').toDate(),
        $lte: today.clone().endOf('days').toDate(),
      };
      processQuery.sort = { summary: { download: 'desc' }, updatedAt: 'desc', ...processQuery.sort };
    }

    return super.paginate(processQuery);
  }

  async recommend(loggedUser: User): Promise<ArticlePaginationDto> {
    const [user, bizUsers, blocks] = await Promise.all([
      this.userRepo.preload(loggedUser),
      this.userRepo.findBizUsers(),
      this.blockRepo.findArticleBlock(loggedUser._id),
    ]);

    const select = ['_id', 'title', 'description', 'createdAt', 'type', 'postedAt', 'summary', 'authorId'];
    const fileSelect = ['files._id', 'files.type', 'files.url', 'files.preview', 'files.ratio'];
    const processQuery: IMongoRequest<Article> = {
      page: 1,
      limit: 20,
      condition: {
        artistIds: { $in: user.artistIds.map(String) } as any,
        authorId: { $in: bizUsers.map(user => user._id) },
        _id: { $nin: map(blocks, block => String(block.targetId)) },
        type: ArticleType.CARD,
        status: ArticleStatus.ACTIVATED,
      },
      sort: { summary: { download: 'desc', view: 'desc' }, updatedAt: 'desc' },
      populate: { author: { select: ['_id', 'avatar', 'email', 'nickname'] } },
      select: [...select, ...fileSelect] as any,
    };
    return super.paginate(processQuery);
  }

  async myArticles(query: IMongoRequest<Article>, loggedUser: User): Promise<ArticlePaginationDto> {
    const select = ['_id', 'title', 'description', 'createdAt', 'type', 'postedAt', 'summary', 'authorId'];
    const fileSelect = ['files._id', 'files.type', 'files.url', 'files.preview', 'files.ratio'];
    const processQuery: IMongoRequest<Article> = {
      ...query,
      condition: { authorId: loggedUser._id, type: ArticleType.CARD, ...query.condition },
      sort: { ...query.sort, postedAt: 'desc' },
      populate: { author: { select: ['_id', 'avatar', 'email', 'nickname'] } },
      select: [...select, ...fileSelect] as any,
    };
    return super.paginate(processQuery);
  }

  async myLikeArticles(query: IMongoRequest<Article>): Promise<ArticlePaginationDto> {
    const loggedUser = this.request.loggedUser;
    const { items, total } = await this.emotionRepo.myLikeArticles(query, loggedUser._id);
    const res = this.transformPaginate(items, total, query);
    return {
      ...res,
      items: res.items.map(item => Object.assign(item, { isLiked: true })),
    };
  }

  async getLikedUsers(query: IMongoRequest<User>, article: Article, loggedUser: User): Promise<UserLikedPaginationDto> {
    const [bannedUsers, blocks] = await Promise.all([
      this.userRepo.find({ select: '_id', condition: { status: { $ne: UserStatus.ACTIVATED } } }),
      this.blockRepo.findUserBlock(loggedUser._id),
    ]);

    const excludeUserIds: string[] = [
      ...bannedUsers.map(user => user._id),
      ...blocks.map(block => String(block.targetId)),
    ];
    const { items, total } = await this.emotionRepo.getLikedUsers(query, article._id, excludeUserIds);
    return this.transformPaginate<UserLiked>(items, total, query as any);
  }

  async like(article: Article, loggedUser: User): Promise<Article> {
    const payload = { authorId: loggedUser._id, targetId: article._id, target: Article.name, type: EmotionType.LIKE };
    const isLiked = await this.emotionRepo.findOne(payload);
    if (isLiked) throw new BadRequestException('article.ALREADY_LIKED');
    await this.emotionRepo.create(payload);
    this.articleClient.emit({ cmd: 'Article.summary' }, { article, action: EmotionType.LIKE });
    article.summary.like++;
    return article;
  }

  async unlike(article: Article, loggedUser: User): Promise<Article> {
    const payload = { authorId: loggedUser._id, targetId: article._id, target: Article.name, type: EmotionType.LIKE };
    const isLiked = await this.emotionRepo.findOne(payload);
    if (!isLiked) throw new BadRequestException('article.NOT_ALREADY_LIKED');
    await this.emotionRepo.delete(isLiked._id, { force: true });
    this.articleClient.emit({ cmd: 'Article.summary' }, { article, action: EmotionType.LIKE });
    article.summary.like--;
    return article;
  }

  async download(body: ArticleCreateDto, article: Article, loggedUser: User): Promise<Article> {
    if (article.type !== ArticleType.CARD) throw new BadRequestException('article.ONLY_DOWNLOAD_PHOTO');
    const savedArticle = await this.articleRepo.create({
      ...pick(article, ['title', 'subhead', 'description', 'tagIds', 'artistIds', 'rawHashtags', 'type', 'status']),
      ...body,
      files: body.files.map(file => omit(file, ['_id'])),
      postedAt: new Date(),
      modifiedAt: new Date(),
      authorId: loggedUser._id,
      parentId: article._id,
    });
    if (savedArticle) {
      await this.emotionRepo.create({
        type: EmotionType.DOWNLOAD,
        target: Article.name,
        targetId: article._id,
        authorId: loggedUser._id,
      });
      this.articleClient.emit({ cmd: 'Article.summary' }, { article, action: EmotionType.DOWNLOAD });
    }
    return savedArticle;
  }

  async view(body: ArticleViewDto, loggedUser: User): Promise<SuccessResponse> {
    this.articleClient.emit({ cmd: 'Article.view' }, { viewData: body, userId: loggedUser._id });
    return { success: true };
  }

  async share(body: ArticleShareDto, article: Article, loggedUser: User): Promise<Article> {
    const payload = { authorId: loggedUser._id, targetId: article._id, target: Article.name, type: EmotionType.SHARE };
    const isShared = await this.emotionRepo.findOne(payload);
    if (isShared) throw new BadRequestException('article.ALREADY_SHARED');

    const uuid = last(generateUUID().split('-'));
    await this.emotionRepo.create({
      ...payload,
      deepLink: body.deepLink || `https://example.dispatch.co.kr/${uuid}`, // TODO: Handle more logic here
      payload: body.payload || {},
    });
    this.articleClient.emit({ cmd: 'Article.summary' }, { article, action: EmotionType.SHARE });
    article.summary.share++;
    return article;
  }

  async findOne(query: IBaseRequest<Article>): Promise<Article> {
    const res = await super.findOne(query);
    if (res) {
      const loggedUser = this.request.loggedUser;
      const emotion = await this.emotionRepo.findOne({
        authorId: loggedUser._id,
        targetId: res._id,
        target: Article.name,
        type: EmotionType.LIKE,
      });
      res['isLiked'] = !!emotion;
    }
    return res;
  }

  async delete(id: string): Promise<Article> {
    const loggedUser = this.request.loggedUser;
    const article = await this.articleRepo.findOne(id);
    if (!article) throw new NotFoundException('article.NOT_FOUND');
    if (String(article.authorId) !== loggedUser._id) throw new BadRequestException('article.CAN_NOT_DELETE');
    return super.delete(id);
  }
}
