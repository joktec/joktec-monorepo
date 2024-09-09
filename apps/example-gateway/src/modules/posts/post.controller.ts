import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Post } from '../../models/schemas';
import { PostService } from './post.service';

const props: IControllerProps<Post> = {
  dto: Post,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('posts')
export class PostController extends BaseController<Post, string>(props) {
  constructor(protected postService: PostService) {
    super(postService);
  }
}
