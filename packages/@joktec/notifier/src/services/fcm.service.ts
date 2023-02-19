import admin, { app, messaging } from 'firebase-admin';
import { INotifierClient } from '../notifier.client';
import { NotifierMessage, NotifierRequest, NotifierResult, NotifierTopicResponse } from '../models';
import { toBool } from '@joktec/core';
import { IFcmConfig } from '../configs';
import { buildFcmOption, buildFcmPayload } from '../notifier.util';

export class FcmService implements INotifierClient {
  private _config: IFcmConfig;
  private _client: app.App;

  constructor(config: IFcmConfig) {
    this._config = config;
    this._client = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this._config.projectId,
        clientEmail: this._config.clientEmail,
        privateKey: this._config.privateKey,
      }),
      databaseURL: this._config.databaseUrl,
    });
  }

  async sendToTopic(topic: string, req: NotifierRequest): Promise<NotifierTopicResponse> {
    return this._client.messaging().sendToTopic(topic, buildFcmPayload(req), buildFcmOption(req));
  }

  async sendToDevice(deviceToken: string | string[], req: NotifierRequest): Promise<NotifierResult> {
    const response = await this._client.messaging().sendToDevice(deviceToken, buildFcmPayload(req));
    return {
      method: 'sendToDevice',
      success: response.successCount,
      failure: response.failureCount,
      messages: response.results.map<NotifierMessage>(r => ({
        regId: r.canonicalRegistrationToken,
        originalRegId: null,
        messageId: r.messageId,
        error: !r.error ? null : { ...r.error, data: r.error.toJSON() },
      })),
    };
  }
}
