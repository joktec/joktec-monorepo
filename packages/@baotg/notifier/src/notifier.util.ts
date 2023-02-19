import { NotifierRequest } from './models';
import { messaging } from 'firebase-admin';
import { toArray, toBool, toInt } from '@baotg/core';
import apn from 'node-apn';

export const buildFcmPayload = (req: NotifierRequest): messaging.MessagingPayload => {
  const { data, notification } = req;
  return {
    data: { ...data },
    notification: {
      title: notification.title,
      body: notification.body,
      tag: notification.tag,
      icon: notification.icon,
      badge: notification.badge,
      color: notification.color,
      sound: notification.sound,
      bodyLocKey: notification.bodyLocKey,
      bodyLocArgs: notification.bodyLocArgs,
      clickAction: notification.clickAction,
      titleLocKey: notification.titleLocKey,
      titleLocArgs: notification.titleLocArgs,
    },
  };
};

export const buildFcmOption = (req: NotifierRequest): messaging.MessagingOptions => {
  const { option } = req;
  return { ...option, contentAvailable: toBool(option.contentAvailable) };
};

export const buildApnPayload = (req: NotifierRequest): apn.Notification => {
  const { option, data, notification } = req;
  const note = new apn.Notification();
  note.expiry = option.expiry;
  note.badge = toInt(notification.badge);
  note.sound = notification.sound;
  note.alert = {
    title: notification.title,
    body: notification.body,
    subtitle: notification.title,
    'title-loc-key': notification.titleLocKey,
    'title-loc-args': toArray<string>(notification.titleLocArgs),
    'action-loc-key': notification.action,
    'loc-key': notification.locKey,
  };
  note.payload = { ...data };
  return note;
};
