import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseOrganizationInput {
  @Field(() => String, {
    nullable: true,
  })
  address!: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  countryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  districtId!: string;

  @Field(() => String, {
    nullable: true,
  })
  emailAddress!: string;

  @Field(() => String, {
    nullable: true,
  })
  emailConnected!: string;

  @Field(() => String, {
    nullable: true,
  })
  emailPassword!: string;

  @Field(() => String, {
    nullable: true,
  })
  emailServerImap!: string;

  @Field(() => String, {
    nullable: true,
  })
  employeeNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  languageId!: string;

  @Field(() => String, {
    nullable: true,
  })
  locationName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  locked!: number;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Date, {
    nullable: true,
  })
  packageExpireDate!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  packageId!: number;

  @Field(() => String, {
    nullable: true,
  })
  publicId!: string;

  @Field(() => String, {
    nullable: true,
  })
  reasonWork!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  website!: string;

  @Field(() => Int, {
    nullable: true,
  })
  jobSlot!: number;

  @Field(() => String, {
    nullable: true,
  })
  businessLicense!: string;

  @Field(() => String, {
    nullable: true,
  })
  businessLicenseName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isFeatured!: number;

  @Field(() => String, {
    nullable: true,
  })
  recruiterEmail!: string;

  @Field(() => Int, {
    nullable: true,
  })
  totalCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  remainingCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  headcountId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  jobTitleId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  organizationSizeId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  businessVerified!: number;

  @Field(() => Int, {
    nullable: true,
  })
  locationId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  bonusCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  debtCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  autoFeeding!: number;

  @Field(() => Int, {
    nullable: true,
  })
  activeBudget!: number;

  @Field(() => Int, {
    nullable: true,
  })
  budgetCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalSlots!: number;

  @Field(() => Int, {
    nullable: true,
  })
  remainingSlots!: number;

  @Field(() => Int, {
    nullable: true,
  })
  budgetSlots!: number;

  @Field(() => String, {
    nullable: true,
  })
  videoLink!: string;

  @Field(() => Int, {
    nullable: true,
  })
  totalOwner!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalAdmin!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalHrMember!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalHiringManager!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalUsers!: number;

  @Field(() => String, {
    nullable: true,
  })
  hsCompanyId!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionPrivate!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionPrivateVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  customUrlCompany!: string;

  @Field(() => String, {
    nullable: true,
  })
  locationFilterId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  expiredCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => Int, {
    nullable: true,
  })
  introducedJobmatch!: number;

  @Field(() => Int, {
    nullable: true,
  })
  showCompanyPage!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalJobInterviewSlots!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalremainingJobInterviewSlotssers!: number;

  @Field(() => String, {
    nullable: true,
  })
  packageType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isFptoActive!: number;

  @Field(() => Int, {
    nullable: true,
  })
  vat!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isPartner!: number;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfJobViews!: number;

  @Field(() => Int, {
    nullable: true,
  })
  followerInitial!: number;

  @Field(() => Int, {
    nullable: true,
  })
  viewCount!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isOrgDemo!: number;

  @Field(() => Int, {
    nullable: true,
  })
  wardId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  locCityId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  locDistrictId!: number;

  @Field(() => String, {
    nullable: true,
  })
  companyTag!: string;

  @Field(() => Int, {
    nullable: true,
  })
  maxTiAssistedJob!: number;

  @Field(() => Int, {
    nullable: true,
  })
  foundedIn!: number;

  @Field(() => String, {
    nullable: true,
  })
  slogan!: string;

  @Field(() => String, {
    nullable: true,
  })
  benefitOther!: string;

  @Field(() => Int, {
    nullable: true,
  })
  inactive!: number;

  @Field(() => String, {
    nullable: true,
  })
  createdOn!: string;

  @Field(() => String, {
    nullable: true,
  })
  benefitOtherVi!: string;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  specialties!: object | [];

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  socialChannel!: object | [];

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => Int, {
    nullable: true,
  })
  companyTypeId!: number;
}

@InputType()
export class CreateOrganizationInput extends BaseOrganizationInput {}

@InputType()
export class UpdateOrganizationInput extends BaseOrganizationInput {
  @Field()
  id!: string;
}

@InputType()
export class OrganizationPaginationInput extends BasePaginationInput {}

@InputType()
export class OrganizationConditionInput extends BaseConditionInput {
  @Field(() => [String], {
    nullable: true,
  })
  _id!: string[];

  @Field(() => [Int], {
    nullable: true,
  })
  companyTypeId!: number[];

  @Field(() => [String], {
    nullable: true,
  })
  cityId!: string[];

  @Field(() => Int, {
    nullable: true,
  })
  inactive!: number;
}

@InputType()
export class OrganizationQueryInput extends BaseQueryInput({
  conditionInput: OrganizationConditionInput,
  paginationInput: OrganizationPaginationInput,
})<OrganizationConditionInput, OrganizationPaginationInput> {}
