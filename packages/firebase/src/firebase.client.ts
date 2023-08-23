import { Client } from '@joktec/core';
import admin from 'firebase-admin';
import { FirebaseConfig } from './firebase.config';
import { FirebaseAuth, FirebaseDatabase, FirebaseFirestore, FirebaseMessaging, FirebaseStorage } from './models';

export type FirebaseInstance = admin.app.App;

export interface FirebaseClient extends Client<FirebaseConfig, FirebaseInstance> {
  auth(conId?: string): FirebaseAuth;

  database(url?: string, conId?: string): FirebaseDatabase;

  messaging(conId?: string): FirebaseMessaging;

  storage(conId?: string): FirebaseStorage;

  firestore(conId?: string): FirebaseFirestore;
}
