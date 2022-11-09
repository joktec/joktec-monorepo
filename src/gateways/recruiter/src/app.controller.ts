import { Controller, Post, Get, Body } from '@nestjs/common';
import { GoogleSheetService } from './modules/google-api/google-sheet.service';

interface Data {
  sheetName: string;
  timestamp: string;
  keywordSearch: string;
  jobTitle: string;
  companyName: string;
  packageChosen: string;
  assignToCS: string;
  sql: string;
}

@Controller()
export class AppController {
  constructor(private readonly googleSheetService: GoogleSheetService) {}
  @Post('insert-data-to-sheet')
  async insertDataToSheet(@Body() body: Data) {
    try {
      const values = [
        [
          body.timestamp,
          body.keywordSearch,
          body.jobTitle,
          body.companyName,
          body.packageChosen,
          body.assignToCS,
          body.sql,
        ],
      ];

      const googleSheets = await this.googleSheetService.getGoogleSheet();

      return await googleSheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        valueInputOption: 'USER_ENTERED',
        range: `${body.sheetName}!A:G`,
        requestBody: {
          values,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  getHello() {
    return 'Recruiter gateway';
  }

  @Get('/health')
  health() {
    return 'OK';
  }
}
