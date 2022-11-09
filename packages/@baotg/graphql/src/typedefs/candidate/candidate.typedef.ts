import { GraphQLJSON } from 'graphql-type-json';
import {
  BaseListResponse,
  BaseTypedef,
  CandidateCompanyType,
  CandidateFunction,
  CandidateIndustry,
  CandidateLink,
  CandidateLocation,
} from '..';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CandidateCount } from '.';

@ObjectType()
export class Candidate extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  address!: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar!: string;

  @Field(() => String, {
    nullable: true,
  })
  birthday!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  cos!: number;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  detail!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  experience!: string;

  @Field(() => String, {
    nullable: true,
  })
  feedDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  feedExpireDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  fullName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  gender!: number;

  @Field(() => String, {
    nullable: true,
  })
  introduction!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  linkCv!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  position!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Int, {
    nullable: true,
  })
  statusMatching!: number;

  @Field(() => String, {
    nullable: true,
  })
  statusMatchingName!: string;

  @Field(() => String, {
    nullable: true,
  })
  tag!: string;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => Int, {
    nullable: true,
  })
  cosAi!: number;

  @Field(() => String, {
    nullable: true,
  })
  feedByUser!: string;

  @Field(() => String, {
    nullable: true,
  })
  typeUpdateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  nameFile!: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  referalLink!: string;

  @Field(() => String, {
    nullable: true,
  })
  skill!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  usernameType!: string;

  @Field(() => String, {
    nullable: true,
  })
  linkCvRedacted!: string;

  @Field(() => Int, {
    nullable: true,
  })
  redacted!: number;

  @Field(() => Int, {
    nullable: true,
  })
  interest!: number;

  @Field(() => String, {
    nullable: true,
  })
  applyType!: string;

  @Field(() => String, {
    nullable: true,
  })
  feedDescription!: string;

  feedItemIds!: object | [];

  @Field(() => String, {
    nullable: true,
  })
  candidateType!: string;

  @Field(() => String, {
    nullable: true,
  })
  appliedType!: string;

  @Field(() => String, {
    nullable: true,
  })
  overridingCvLink!: string;

  @Field(() => Int, {
    nullable: true,
  })
  showContact!: number;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  analysis!: object;

  @Field(() => Int, {
    nullable: true,
  })
  credits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isSuggested!: number;

  @Field(() => Int, {
    nullable: true,
  })
  paid!: number;

  @Field(() => Int, {
    nullable: true,
  })
  suggestedCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  manualCredits!: number;

  @Field(() => String, {
    nullable: true,
  })
  aiInfo!: string;

  @Field(() => Int, {
    nullable: true,
  })
  burntCredits!: number;

  @Field(() => Int, {
    nullable: true,
  })
  haveRedactedLink!: number;

  @Field(() => String, {
    nullable: true,
  })
  ranking!: string;

  @Field(() => String, {
    nullable: true,
  })
  skills!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  marketValueCurrency!: string;

  @Field(() => String, {
    nullable: true,
  })
  expectedSalaryCurrency!: string;

  @Field(() => Int, {
    nullable: true,
  })
  topCandidate!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalPool!: number;

  @Field(() => Int, {
    nullable: true,
  })
  hopScore!: number;

  @Field(() => Int, {
    nullable: true,
  })
  aiMatchScore!: number;

  @Field(() => Int, {
    nullable: true,
  })
  matchScore!: number;

  @Field(() => Int, {
    nullable: true,
  })
  companyTypeId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  functionId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  industryId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  locationId!: number;

  @Field(() => Int, {
    nullable: true,
  })
  marketValue!: number;

  @Field(() => Int, {
    nullable: true,
  })
  expectedSalary!: number;

  @Field(() => Int, {
    nullable: true,
  })
  aiMarketValue!: number;

  @Field(() => Int, {
    nullable: true,
  })
  statusUnlock!: number;

  @Field(() => Int, {
    nullable: true,
  })
  statusCodeAiUnlock!: number;

  @Field(() => String, {
    nullable: true,
  })
  updateStatusDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  originalCvId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isTalent!: number;

  @Field(() => Int, {
    nullable: true,
  })
  draftCandidate!: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => String, {
    nullable: true,
  })
  suggestedCvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvHopin!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  countUnlockAi!: number;

  @Field(() => Int, {
    nullable: true,
  })
  inactive!: number;

  @Field(() => Int, {
    nullable: true,
  })
  burntApplicant!: number;

  @Field(() => Int, {
    nullable: true,
  })
  countThumbdown!: number;

  cvsDuplicated!: [];

  @Field(() => String, {
    nullable: true,
  })
  hopinConfidence!: string;

  @Field(() => String, {
    nullable: true,
  })
  hopinSignal!: string;

  @Field(() => String, {
    nullable: true,
  })
  tpMatchType!: string;

  @Field(() => String, {
    nullable: true,
  })
  hopin!: Date;

  @Field(() => [String], {
    nullable: true,
  })
  allowedStatus!: string[];

  @Field(() => [CandidateCompanyType], {
    nullable: true,
  })
  companyTypes!: CandidateCompanyType[];

  @Field(() => [CandidateFunction], {
    nullable: true,
  })
  functions!: CandidateFunction[];

  @Field(() => [CandidateIndustry], {
    nullable: true,
  })
  industries!: CandidateIndustry[];

  @Field(() => [CandidateLocation], {
    nullable: true,
  })
  locations!: CandidateLocation[];

  @Field(() => [CandidateLink], {
    nullable: true,
  })
  referralLinks!: CandidateLink[];

  @Field(() => Boolean, {
    nullable: true,
  })
  cvUncovered: boolean;
}

@ObjectType()
export class CandidateDetail extends Candidate {}

@ObjectType()
export class CandidateListReponse extends BaseListResponse({
  viewDto: Candidate,
}) {
  @Field(() => CandidateCount)
  counts: CandidateCount;
}
