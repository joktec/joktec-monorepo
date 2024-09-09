import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../common';
import { Report } from '../../models/schemas';
import { ReportCreateDto } from './models';
import { ReportService } from './report.service';

const props: IControllerProps<Report> = {
  dto: Report,
  customDto: { createDto: ReportCreateDto },
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('reports')
export class ReportController extends BaseController<Report, string>(props) {
  constructor(protected reportService: ReportService) {
    super(reportService);
  }
}
