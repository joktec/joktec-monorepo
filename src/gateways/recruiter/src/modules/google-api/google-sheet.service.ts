import { Injectable } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetService {
  private auth: GoogleAuth<JSONClient>;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: process.env.CREDENTIAL_PATH,
      scopes: process.env.GOOGLE_AUTH_SCOPES,
    });
  }

  async getGoogleSheet() {
    const client = await this.auth.getClient();
    const googleSheets = google.sheets({
      version: 'v4',
      auth: client,
    }).spreadsheets;
    return googleSheets;
  }
}
