import admin from 'firebase-admin';
import { App } from 'firebase-admin/app';

export type FirebaseApp = App;
export type FirebaseAuth = admin.auth.Auth;
export type FirebaseDatabase = admin.database.Database;
export type FirebaseMessaging = admin.messaging.Messaging;
export type FirebaseStorage = admin.storage.Storage;
export type FirebaseFirestore = admin.firestore.Firestore;
