import AWS from 'aws-sdk';
import { INotifierClient } from '../notifier.client';
import { ISnsConfig } from '../configs';
import { messaging } from 'firebase-admin';
import { NotifierRequest, NotifierResult, NotifierTopicResponse } from '../models';
import { toBool } from '@baotg/core';
import { buildApnPayload, buildFcmPayload } from '../notifier.util';

export class SnsService implements INotifierClient {
  private _config: ISnsConfig;
  private _client: AWS.SNS;

  constructor(config: ISnsConfig) {
    this._config = config;
    this._client = new AWS.SNS({
      region: this._config.region,
      accessKeyId: this._config.accessKey,
      secretAccessKey: this._config.secretKey,
    });
  }

  private buildPayload(req: NotifierRequest): any {
    const { data, notification } = req;
    return {
      data,
      default: notification.body,
      APNS: JSON.stringify(buildApnPayload(req)),
      GCM: JSON.stringify(buildFcmPayload(req)),
    };
  }

  private buildOption(req: NotifierRequest): messaging.MessagingOptions {
    const { option } = req;
    return { ...option, contentAvailable: toBool(option.contentAvailable) };
  }

  async sendToTopic(topic: string, req: NotifierRequest): Promise<NotifierTopicResponse> {
    const message = this.buildPayload(req);
    const messageAttributes = {
      'AWS.SNS.MOBILE.APNS': { DataType: 'String', StringValue: message.APNS },
      'AWS.SNS.MOBILE.APNS_SANDBOX': { DataType: 'String', StringValue: message.APNS },
      'AWS.SNS.MOBILE.GCM': { DataType: 'String', StringValue: message.GCM },
      'AWS.SNS.MOBILE.DEFAULT': { DataType: 'String', StringValue: message.default },
    };

    const res = await this._client
      .publish({
        TopicArn: topic,
        MessageStructure: 'json',
        Message: JSON.stringify(message),
        MessageAttributes: messageAttributes,
      })
      .promise();

    return { messageId: res.MessageId };
  }

  async sendToDevice(deviceToken: string | string[], req: NotifierRequest): Promise<NotifierResult> {
    // const response: any = {results:[]}; //await this._client.messaging().sendToDevice(deviceToken, this.buildPayload(req));
    // return {
    //   method: 'sendToDevice',
    //   success: response.successCount,
    //   failure: response.failureCount,
    //   messages: response.results.map<NotifierMessage>(r => ({
    //     regId: r.canonicalRegistrationToken,
    //     originalRegId: null,
    //     messageId: r.messageId,
    //     error: !r.error ? null : { ...r.error, data: r.error.toJSON() },
    //   })),
    // };
    return null;
  }
}
