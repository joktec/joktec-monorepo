import { Module } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';

@Module({
  providers: [GoogleSheetService],
  exports: [GoogleSheetService],
})
export class GoogleAPIModule {}
