import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import OpenAI from 'openai';
import { GptClient } from './gpt.client';
import { GptConfig } from './gpt.config';
import { GptRequest, GptResponse } from './models';

@Injectable()
export class GptService extends AbstractClientService<GptConfig, OpenAI> implements GptClient {
  constructor() {
    super('gpt', GptConfig);
  }

  async init(config: GptConfig): Promise<OpenAI> {
    return new OpenAI({ apiKey: config.apiKey });
  }

  async start(client: OpenAI, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  async stop(client: OpenAI, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Implement
  }

  async chat(req: GptRequest, conId: string = DEFAULT_CON_ID): Promise<GptResponse> {
    return this.getClient(conId).chat.completions.create({
      messages: [{ role: 'user', content: req.message }],
      model: 'gpt-3.5-turbo',
    });
  }
}
