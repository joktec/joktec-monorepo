import { BaseDto, BaseListResponseDto } from '../base.dto';

export class OrganizationDto extends BaseDto {
  address!: string;

  cityId!: string;

  countryId!: string;

  createBy!: string;

  createDate!: Date;

  description!: string;

  descriptionVi!: string;

  districtId!: string;

  emailAddress!: string;

  emailConnected!: string;

  emailPassword!: string;

  emailServerImap!: string;

  employeeNumber!: string;

  industryId!: string;

  languageId!: string;

  lastUpdate!: string;

  locationName!: string;

  locked!: number;

  logo!: string;

  name!: string;

  packageExpireDate!: Date;

  packageId!: number;

  publicId!: string;

  reasonWork!: string;

  source!: string;

  updateBy!: string;

  website!: string;

  jobSlot!: number;

  businessLicense!: string;

  businessLicenseName!: string;

  isFeatured!: number;

  recruiterEmail!: string;

  totalCredits!: number;

  remainingCredits!: number;

  headcountId!: number;

  jobTitleId!: number;

  organizationSizeId!: number;

  businessVerified!: number;

  locationId!: number;

  bonusCredits!: number;

  debtCredits!: number;

  autoFeeding!: number;

  activeBudget!: number;

  budgetCredits!: number;

  totalSlots!: number;

  remainingSlots!: number;

  budgetSlots!: number;

  videoLink!: string;

  totalOwner!: number;

  totalAdmin!: number;

  totalHrMember!: number;

  totalHiringManager!: number;

  totalUsers!: number;

  hsCompanyId!: string;

  descriptionPrivate!: string;

  descriptionPrivateVi!: string;

  customUrlCompany!: string;

  locationFilterId!: string;

  expiredCredits!: number;

  platform!: number;

  introducedJobmatch!: number;

  showCompanyPage!: number;

  totalJobInterviewSlots!: number;

  remainingJobInterviewSlots!: number;

  packageType!: string;

  isFptoActive!: number;

  vat!: number;

  isPartner!: number;

  numberOfJobViews!: number;

  followerInitial!: number;

  viewCount!: number;

  isOrgDemo!: number;

  wardId!: number;

  locCityId!: number;

  locDistrictId!: number;

  companyTag!: string;

  maxTiAssistedJob!: number;

  foundedIn!: number;

  slogan!: string;

  benefitOther!: string;

  inactive!: number;

  createdOn!: string;

  benefitOtherVi!: string;

  specialties!: object | [];

  socialChannel!: object | [];

  email!: string;

  phoneNumber!: string;

  companyTypeId!: number;
}

export class OrganizationListReponseDto extends BaseListResponseDto<OrganizationDto> {}
