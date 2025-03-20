import { DeepPartial, Injectable } from '@joktec/core';
import { MongoRepo, MongoService, UpdateQuery } from '@joktec/mongo';
import { plainToInstance } from '@joktec/utils';
import { Emotion } from '../../models/schemas';

@Injectable()
export class EmotionRepo extends MongoRepo<Emotion, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Emotion);
  }

  async insertMany(body: (DeepPartial<Emotion> & UpdateQuery<Emotion>)[]) {
    const docs = plainToInstance(Emotion, body);
    const emotions = await this.model.insertMany(docs);
    return plainToInstance(Emotion, emotions);
  }
}
