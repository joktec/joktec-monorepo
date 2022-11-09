import { Language } from './language.typedef';
import { Field, ObjectType } from '@nestjs/graphql';
import { Benefit } from './benefit.typedef';
import { JobFunction } from './job-function.typedef';
import { JobStatus } from './job-status.typedef';
import { Level } from './level.typedef';
import { LocationSelection } from './location-selection.typedef';
import { Package } from './package.typedef';
import { Salary } from './salary.typedef';
import { SalaryReviewFilterData } from './salary-review-filter-data.typedef';
import { SortType } from './sort-type.typedef';
import { TagFunction } from './tag-function.typedef';
import { University } from './university.typedef';
import { MiscWorkingTimeConversion } from './working-time-conversion.typedef';
import { MiscWorkplaceType } from './workplace-type.typedef';
import { YearOfExperience } from './year-of-experience.typedef';
import { AccountDeletionReason } from './account-deletion-reason.typedef';
import { CompanyTag } from './company-tag.typedef';
import { CompanyType } from './company-type.typedef';
import { Company } from './company.typedef';
import { CurrencyConversion } from './currency-conversion.typedef';
import { Degree } from './degree.typedef';
import { Department } from './department.typedef';
import { FaqContentType } from './faq-content-type.typedef';
import { Headcount } from './headcount.typedef';
import { Industry } from './industry.typedef';
import { InterviewReviewFilter } from './interview-review-filter.typedef';
import { JobBadge } from './job-badge.typedef';
import { JobCategory } from '../job/job-category.typedef';
import { FptoCity } from './misc-fpto-city.typedef';
import { FptoIndustry } from './misc-fpto-industry.typedef';
import { City } from '../common';
import { JobhopSuggestedKeyword, JobTitle, JobType } from '../job';
import { OrganizationSize } from '../organization';
import { Keyword } from '..';
import { CvTemplate } from '../cv/cv-template.typedef';
import { HighlightCompany } from '..';

@ObjectType()
export class Misc {
  @Field(() => [AccountDeletionReason], {
    nullable: true,
  })
  accountDeletionReason: AccountDeletionReason[];

  @Field(() => [City], {
    nullable: true,
  })
  cities: City[];

  @Field(() => [Benefit], {
    nullable: true,
  })
  benefits: Benefit[];

  // TODO: DO LATER
  @Field(() => [Company], {
    nullable: true,
  })
  companies: Company[];

  @Field(() => [CompanyType], {
    nullable: true,
  })
  companyTypes: CompanyType[];

  @Field(() => [CompanyTag], { nullable: true })
  companyTags: CompanyTag[];

  @Field(() => CurrencyConversion, {
    nullable: true,
  })
  currencyConversion: CurrencyConversion;

  @Field(() => [Degree], { nullable: true })
  degrees: Degree[];

  @Field(() => [Department], { nullable: true })
  departments: Department[];

  // TODO: DO LATER
  @Field(() => [FaqContentType], { nullable: true })
  faqContentTypes: FaqContentType[];

  @Field(() => [JobCategory], { nullable: true })
  functions: JobCategory[];

  @Field(() => [Headcount], { nullable: true })
  headcounts: Headcount[];

  @Field(() => [Industry], { nullable: true })
  industries: Industry[];

  @Field(() => [InterviewReviewFilter], { nullable: true })
  interviewReviewFilters: InterviewReviewFilter[];

  @Field(() => [JobBadge], { nullable: true })
  jobBadges: JobBadge[];

  @Field(() => [JobFunction], {
    nullable: true,
  })
  jobFunctions: JobFunction[];

  @Field(() => [JobStatus], {
    nullable: true,
  })
  jobStatus: JobStatus[];

  @Field(() => [JobTitle], {
    nullable: true,
  })
  jobTitles: JobTitle[];

  @Field(() => [JobType], {
    nullable: true,
  })
  jobTypes: JobType[];

  @Field(() => [Language], {
    nullable: true,
  })
  languages: Language[];

  @Field(() => [Level], {
    nullable: true,
  })
  levels: Level[];

  @Field(() => [LocationSelection], {
    nullable: true,
  })
  locationSelection: LocationSelection[];

  @Field(() => [OrganizationSize], {
    nullable: true,
  })
  organizationSizes: OrganizationSize[];

  @Field(() => [Package], {
    nullable: true,
  })
  packages: Package[];

  @Field(() => [Salary], {
    nullable: true,
  })
  salaries: Salary[];

  @Field(() => SalaryReviewFilterData, {
    nullable: true,
  })
  salaryReviewFilterData: SalaryReviewFilterData;

  @Field(() => [SortType], {
    nullable: true,
  })
  sortTypes: SortType[];

  @Field(() => [TagFunction], {
    nullable: true,
  })
  tagFunction: TagFunction[];

  @Field(() => [University], {
    nullable: true,
  })
  universities: University[];

  @Field(() => MiscWorkingTimeConversion, {
    nullable: true,
  })
  workingTimeConversion: MiscWorkingTimeConversion;

  @Field(() => [MiscWorkplaceType], {
    nullable: true,
  })
  workplaceTypes: MiscWorkplaceType[];

  @Field(() => [YearOfExperience], {
    nullable: true,
  })
  yearOfExperience: YearOfExperience[];

  @Field(() => [String], {
    nullable: true,
  })
  yearsWorking: String[];

  @Field(() => [FptoCity], {
    nullable: true,
  })
  fptoCityFilter: FptoCity[];

  @Field(() => [FptoIndustry], {
    nullable: true,
  })
  fptoIndustries: FptoIndustry[];

  @Field(() => [Keyword], {
    nullable: true,
  })
  keywords: Keyword[];

  @Field(() => [CvTemplate], {
    nullable: true,
  })
  cvTemplates: CvTemplate[];

  @Field(() => [JobhopSuggestedKeyword], {
    nullable: true,
  })
  suggestedKeyword: JobhopSuggestedKeyword[];

  @Field(() => [HighlightCompany], {
    nullable: true,
  })
  highlightOrganizations: HighlightCompany[];
}
