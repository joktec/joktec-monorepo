import {
  CommonMicroserviceConfig,
  CvMicroserviceConfig,
  JobMicroserviceConfig,
  OrganizationMicroserviceConfig,
} from '@jobhopin/core';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CityDataloader } from './data-loaders/city.dataloader';
import { OrganizationDataloader } from './data-loaders/organization.dataloader';
import { BenefitResolver } from './resolvers/benefit.resolver';
import { CompanyTypeResolver } from './resolvers/company-type.resolver';
import { CompanyResolver } from './resolvers/company.resolver';
import { DegreeResolver } from './resolvers/degree.resolver';
import { DepartmentResolver } from './resolvers/department.resolver';
import { FunctionResolver } from './resolvers/functions.resolver';
import { HeadcountResolver } from './resolvers/headcount.resolver';
import { HighlightCompanyResolver } from './resolvers/highlight-company.resolver';
import { IndustryResolver } from './resolvers/industry.resolver';
import { JobTitleResolver } from './resolvers/job-title.resolver';
import { JobTypeResolver } from './resolvers/job-type.resolver';
import { KeywordResolver } from './resolvers/keyword.resolver';
import { LanguageResolver } from './resolvers/language.resolver';
import { LevelResolver } from './resolvers/level.resolver';
import { MiscResolver } from './resolvers/misc/misc.resolver';
import { OrganizationSizeResolver } from './resolvers/organization-size.resolver';
import { PackageResolver } from './resolvers/package.resolver';
import { SalaryResolver } from './resolvers/salary.resolver';
import { SortTypeResolver } from './resolvers/sort-type.resolver';
import { UniversityResolver } from './resolvers/university.resolver';
import { YearOfExperienceResolver } from './resolvers/year-of-experience.resolver';

const commonMicroserviceConfig = new CommonMicroserviceConfig();
const jobMicroserviceConfig = new JobMicroserviceConfig();
const organizationMicroserviceConfig = new OrganizationMicroserviceConfig();
const cvMicroserviceConfig = new CvMicroserviceConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: commonMicroserviceConfig.name,
        ...commonMicroserviceConfig.microserviceOptions,
      },
      {
        name: jobMicroserviceConfig.name,
        ...jobMicroserviceConfig.microserviceOptions,
      },
      {
        name: organizationMicroserviceConfig.name,
        ...organizationMicroserviceConfig.microserviceOptions,
      },
      {
        name: cvMicroserviceConfig.name,
        ...cvMicroserviceConfig.microserviceOptions,
      },
    ]),
  ],
  providers: [
    MiscResolver,
    CityDataloader,
    CompanyResolver,
    CompanyTypeResolver,
    DegreeResolver,
    DepartmentResolver,
    FunctionResolver,
    HeadcountResolver,
    IndustryResolver,
    JobTitleResolver,
    JobTypeResolver,
    LanguageResolver,
    LevelResolver,
    OrganizationSizeResolver,
    PackageResolver,
    SalaryResolver,
    SortTypeResolver,
    UniversityResolver,
    YearOfExperienceResolver,
    KeywordResolver,
    BenefitResolver,
    HighlightCompanyResolver,
    OrganizationDataloader,
  ],
  controllers: [],
  exports: [CityDataloader, OrganizationDataloader],
})
export class MiscModule {}
