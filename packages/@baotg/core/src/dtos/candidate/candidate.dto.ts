import { BaseDto, BaseListResponseDto } from '../base.dto';

export class CandidateDto extends BaseDto {
  candidateId!: string;

  address!: string;

  avatar!: string;

  birthday!: Date;

  cos!: number;

  createDate!: Date;

  cvId!: string;

  deleted!: number;

  detail!: string;

  email!: string;

  experience!: string;

  feedDate!: Date;

  feedExpireDate!: Date;

  firstName!: string;

  fullName!: string;

  gender!: number;

  introduction!: string;

  jobId!: string;

  lastName!: string;

  lastUpdate!: Date;

  linkCv!: string;

  phoneNumber!: string;

  position!: string;

  source!: string;

  status!: string;

  statusMatching!: number;

  statusMatchingName!: string;

  tag!: string;

  type!: string;

  updateBy!: string;

  cosAi!: number;

  feedByUser!: string;

  typeUpdateBy!: string;

  contentType!: string;

  fileSize!: number;

  nameFile!: string;

  organizationId!: string;

  referalLink!: string;

  skill!: string;

  username!: string;

  usernameType!: string;

  linkCvRedacted!: string;

  redacted!: number;

  interest!: number;

  applyType!: string;

  feedDescription!: string;

  feedItemIds!: object | [];

  candidateType!: string;

  appliedType!: string;

  overridingCvLink!: string;

  showContact!: number;

  analysis!: object;

  credits!: number;

  isSuggested!: number;

  paid!: number;

  suggestedCredits!: number;

  manualCredits!: number;

  aiInfo!: string;

  burntCredits!: number;

  haveRedactedLink!: number;

  ranking!: string;

  skills!: string;

  jobTitle!: string;

  marketValueCurrency!: string;

  expectedSalaryCurrency!: string;

  topCandidate!: number;

  totalPool!: number;

  hopScore!: number;

  aiMatchScore!: number;

  matchScore!: number;

  companyTypeId!: number;

  functionId!: number;

  industryId!: number;

  locationId!: number;

  marketValue!: number;

  expectedSalary!: number;

  aiMarketValue!: number;

  statusUnlock!: number;

  statusCodeAiUnlock!: number;

  updateStatusDate!: Date;

  originalCvId!: string;

  isTalent!: number;

  draftCandidate!: number;

  platform!: number;

  suggestedCvId!: string;

  cvHopin!: Date;

  countUnlockAi!: number;

  inactive!: number;

  burntApplicant!: number;

  countThumbdown!: number;

  cvsDuplicated!: [];

  hopinConfidence!: string;

  hopinSignal!: string;

  tpMatchType!: string;

  hopin!: Date;
}

export class CandidateListReponseDto extends BaseListResponseDto<CandidateDto> {}
