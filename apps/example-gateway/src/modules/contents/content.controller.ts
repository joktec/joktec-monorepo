import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Content } from '../../models/schemas';
import { ContentService } from './content.service';

const props: IControllerProps<Content> = {
  dto: Content,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('contents')
export class ContentController extends BaseController<Content, string>(props) {
  constructor(protected contentService: ContentService) {
    super(contentService);
  }
}
