import { Client } from '@joktec/core';
import OpenAI from 'openai';
import { GptConfig } from './gpt.config';
import { GptRequest, GptResponse } from './models';

export interface GptClient extends Client<GptConfig, OpenAI> {
  chat(config: GptRequest, conId?: string): Promise<GptResponse>;
}
