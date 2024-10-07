import {
  BadRequestException,
  BaseService,
  ClientProxy,
  DeepPartial,
  IBaseRequest,
  Inject,
  Injectable,
  NotFoundException,
  REQUEST,
} from '@joktec/core';
import { IMongoRequest, ObjectId } from '@joktec/mongo';
import { IRequest, TRANSPORT } from '../../app.constant';
import { Comment, User } from '../../models/schemas';
import { ArticleRepo, BlockRepo, CommentRepo } from '../../repositories';
import { CommentCreateDto, CommentPaginationDto } from './models';

@Injectable()
export class CommentService extends BaseService<Comment, string> {
  constructor(
    protected commentRepo: CommentRepo,
    private articleRepo: ArticleRepo,
    private blockRepo: BlockRepo,
    @Inject(TRANSPORT.PROXY.ARTICLE) private articleClient: ClientProxy,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(commentRepo);
  }

  async paginate(query: IBaseRequest<Comment>): Promise<CommentPaginationDto> {
    const loggedUser = this.request.loggedUser;
    const blocks = await this.blockRepo.find({ condition: { authorId: loggedUser._id, target: User.name } });
    return super.paginate({
      ...query,
      condition: {
        ...query.condition,
        authorId: { $nin: blocks.map(block => String(block.targetId)) },
      },
      sort: { ...query.sort, createdAt: 'desc' },
      populate: {
        article: '*',
        author: { select: ['_id', 'avatar', 'email', 'nickname'] },
      },
    });
  }

  async create(entity: CommentCreateDto): Promise<Comment> {
    const loggedUser = this.request.loggedUser;
    const article = await this.articleRepo.findOne(entity.articleId);
    if (!article) throw new BadRequestException('article.NOT_FOUND');
    const comment = await super.create({ ...entity, authorId: loggedUser._id });
    this.articleClient.emit({ cmd: 'Article.summary' }, { article, action: 'comment' });
    return comment;
  }

  async update(id: string, entity: DeepPartial<Comment>): Promise<Comment> {
    const loggedUser = this.request.loggedUser;
    const comment = await this.commentRepo.findOne(id, { populate: { article: '*' } });
    if (!comment) throw new NotFoundException('comment.NOT_FOUND');
    if (!ObjectId.compare(comment.authorId, loggedUser._id)) throw new BadRequestException('comment.NOT_OWNER_COMMENT');
    return super.update(id, entity);
  }

  async delete(id: string): Promise<Comment> {
    const loggedUser = this.request.loggedUser;
    const comment = await this.commentRepo.findOne(id, { populate: { article: '*' } });
    if (!comment) throw new NotFoundException('comment.NOT_FOUND');
    if (!ObjectId.compare(comment.authorId, loggedUser._id)) throw new BadRequestException('comment.NOT_OWNER_COMMENT');
    await super.delete(id);
    if (comment.article) {
      this.articleClient.emit({ cmd: 'Article.summary' }, { article: comment.article, action: 'comment' });
    }
    return comment;
  }

  async myComments(query: IMongoRequest<Comment>): Promise<CommentPaginationDto> {
    const loggedUser = this.request.loggedUser;
    const { items, total } = await this.commentRepo.myComments(query, loggedUser._id);
    return this.transformPaginate(items, total, query);
  }
}
