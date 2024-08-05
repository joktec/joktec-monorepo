import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import admin from 'firebase-admin';
import { getApp } from 'firebase-admin/app';
import { omit } from 'lodash';
import { FirebaseClient, FirebaseInstance } from './firebase.client';
import { FirebaseConfig } from './firebase.config';
import {
  FirebaseApp,
  FirebaseAuth,
  FirebaseDatabase,
  FirebaseFirestore,
  FirebaseMessaging,
  FirebaseStorage,
} from './models';

@Injectable()
export class FirebaseService extends AbstractClientService<FirebaseConfig, FirebaseInstance> implements FirebaseClient {
  constructor() {
    super('firebase', FirebaseConfig);
  }

  async init(config: FirebaseConfig): Promise<FirebaseInstance> {
    const opts = omit(config, ['credential']);
    return admin.initializeApp(
      {
        ...opts,
        credential: admin.credential.cert(config.credential),
      },
      config.conId,
    );
  }

  async start(client: FirebaseInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    const appCheck = client.appCheck();
    this.logService.info('`%s` AppCheck successful: %s', conId, appCheck.app.name);
    this.logService.debug('`%s` AppCheck options: %j', conId, appCheck.app.options);
  }

  async stop(client: FirebaseInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  public getApp(conId: string = DEFAULT_CON_ID): FirebaseApp {
    return getApp(conId);
  }

  public auth(conId: string = DEFAULT_CON_ID): FirebaseAuth {
    return this.getClient(conId).auth();
  }

  public database(url?: string, conId: string = DEFAULT_CON_ID): FirebaseDatabase {
    return this.getClient(conId).database(url);
  }

  public messaging(conId: string = DEFAULT_CON_ID): FirebaseMessaging {
    return this.getClient(conId).messaging();
  }

  public storage(conId: string = DEFAULT_CON_ID): FirebaseStorage {
    return this.getClient(conId).storage();
  }

  public firestore(conId: string = DEFAULT_CON_ID): FirebaseFirestore {
    return this.getClient(conId).firestore();
  }
}
