import { BaseService, Injectable } from '@joktec/core';
import { Emotion } from '../../models/schemas';
import { EmotionRepo } from '../../repositories';

@Injectable()
export class EmotionService extends BaseService<Emotion, string> {
  constructor(protected emotionRepo: EmotionRepo) {
    super(emotionRepo);
  }
}
