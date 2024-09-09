import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Emotion } from '../../models/schemas';
import { EmotionService } from './emotion.service';

const props: IControllerProps<Emotion> = {
  dto: Emotion,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
  paginate: { disable: true },
  detail: { disable: true },
  create: { disable: true },
  update: { disable: true },
  delete: { disable: true },
};

@Controller('emotions')
export class EmotionController extends BaseController<Emotion, string>(props) {
  constructor(protected emotionService: EmotionService) {
    super(emotionService);
  }
}
