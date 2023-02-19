import { INotifierClient } from '../notifier.client';
import { IApnConfig } from '../configs';
import apn from 'node-apn';
import { omit } from 'lodash';
import { NotifierMessage, NotifierRequest, NotifierResult, NotifierTopicResponse } from '../models';
import { buildApnPayload } from '../notifier.util';
import { toArray } from '@baotg/core';

export class ApnService implements INotifierClient {
  private _config: IApnConfig;
  private _client: apn.Provider;

  constructor(config: IApnConfig) {
    this._config = config;
    this._client = new apn.Provider({
      ...omit(this._config, ['keyProvider', 'keyId', 'teamId']),
      token: {
        key: this._config.keyProvider,
        keyId: this._config.keyId,
        teamId: this._config.teamId,
      },
    });
  }

  async sendToTopic(topic: string, req: NotifierRequest): Promise<NotifierTopicResponse> {
    const note: apn.Notification = buildApnPayload(req);
    note.topic = topic;
    const res = await this._client.send(note, []);
    const { sent, failed } = res;
    return { messageId: sent.map(s => s.device)[0] };
  }

  async sendToDevice(deviceToken: string | string[], req: NotifierRequest): Promise<NotifierResult> {
    const note: apn.Notification = buildApnPayload(req);
    const response = await this._client.send(note, toArray<string>(deviceToken));
    const messages: NotifierMessage[] = [];
    response.sent.map(s => messages.push({ regId: s.device, originalRegId: null, messageId: null, error: null }));
    response.failed.map(f => {
      messages.push({
        regId: f.device,
        originalRegId: null,
        messageId: null,
        error: { code: f.status, message: f.response.reason, stack: f.error.stack, data: f.error },
      });
    });
    return {
      method: 'sendToDevice',
      success: response.sent.length,
      failure: response.failed.length,
      messages: messages,
    };
  }
}
