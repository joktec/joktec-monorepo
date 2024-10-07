import {
  BadRequestException,
  BaseService,
  DeepPartial,
  Inject,
  Injectable,
  NotFoundException,
  REQUEST,
} from '@joktec/core';
import { IRequest } from '../../app.constant';
import { Article, Block, User } from '../../models/schemas';
import { ArticleRepo, BlockRepo, UserRepo } from '../../repositories';

@Injectable()
export class BlockService extends BaseService<Block, string> {
  constructor(
    protected blockRepo: BlockRepo,
    private userRepo: UserRepo,
    private articleRepo: ArticleRepo,
    @Inject(REQUEST) public request: IRequest,
  ) {
    super(blockRepo);
  }

  async create(entity: DeepPartial<Block>): Promise<Block> {
    const loggedUser = this.request.loggedUser;
    if (entity.target === Article.name) {
      const article = await this.articleRepo.findOne(String(entity.targetId));
      if (!article) throw new NotFoundException('article.NOT_FOUND');
    }

    if (entity.target === User.name) {
      const user = await this.userRepo.findOne(String(entity.targetId));
      if (!user) throw new NotFoundException('user.NOT_FOUND');
    }

    const block = await this.blockRepo.findOne({
      authorId: loggedUser._id,
      targetId: String(entity.targetId),
      target: entity.target,
    });
    if (block) throw new BadRequestException('block.ALREADY_BLOCKED');

    return super.create({ ...entity, authorId: loggedUser._id });
  }
}
