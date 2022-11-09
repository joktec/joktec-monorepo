import { GoogleSheetService } from './../../google-api/google-sheet.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CrawlDataResponse, DataFormInput } from '@jobhopin/graphql';

@Resolver()
export class RecruiterGoogleSheetResolver {
  constructor(private readonly googleSheetService: GoogleSheetService) {}

  @Mutation(() => CrawlDataResponse)
  async pushDataToSheet(
    @Args('input')
    input: DataFormInput,
  ) {
    try {
      const values = [
        [
          input.timestamp,
          input.keywordSearch,
          input.jobTitle,
          input.companyName,
          input.packageChosen,
          input.assignToCS,
          input.sql,
        ],
      ];

      const googleSheets = await this.googleSheetService.getGoogleSheet();

      const res = await googleSheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        valueInputOption: 'USER_ENTERED',
        range: `${input.sheetName}!A:G`,
        requestBody: {
          values,
        },
      });

      if (res.status === 200) {
        return { isSuccess: true };
      }

      return { isSuccess: false };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
