import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import admin from 'firebase-admin';
import { omit } from 'lodash';
import { FirebaseClient, FirebaseInstance } from './firebase.client';
import { FirebaseConfig } from './firebase.config';
import { FirebaseAuth, FirebaseDatabase, FirebaseFirestore, FirebaseMessaging, FirebaseStorage } from './models';

@Injectable()
export class FirebaseService extends AbstractClientService<FirebaseConfig, FirebaseInstance> implements FirebaseClient {
  constructor() {
    super('firebase', FirebaseConfig);
  }

  async init(config: FirebaseConfig): Promise<FirebaseInstance> {
    const opts = omit(config, ['credential']);
    return admin.initializeApp({
      ...opts,
      credential: admin.credential.cert(config.credential),
    });
  }

  async start(client: FirebaseInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
  }

  async stop(client: FirebaseInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    // Do nothing
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
