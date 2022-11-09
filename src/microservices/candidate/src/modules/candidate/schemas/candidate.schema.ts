import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomMongooseDocument } from '@jobhopin/core';
import { uuid } from 'uuidv4';
export type CandidateDocument = Candidate & CustomMongooseDocument;

@Schema({ collection: 'candidate' })
export class Candidate {
  @Prop({ default: uuid() })
  _id: string;
  @Prop()
  candidateId: string;
  @Prop()
  address: string;
  @Prop()
  avatar: string;
  @Prop()
  birthday: Date;
  @Prop()
  cos: number;
  @Prop()
  createBy: string;
  @Prop()
  createDate: Date;
  @Prop()
  cvId: string;
  @Prop()
  deleted: number;
  @Prop()
  detail: string;
  @Prop()
  email: string;
  @Prop()
  experience: string;
  @Prop()
  feedDate: Date;
  @Prop()
  feedExpireDate: Date;
  @Prop()
  firstName: string;
  @Prop()
  fullName: string;
  @Prop()
  gender: number;
  @Prop()
  introduction: string;
  @Prop()
  jobId: string;
  @Prop()
  lastName: string;
  @Prop()
  lastUpdate: Date;
  @Prop()
  linkCv: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  position: string;
  @Prop()
  source: string;
  @Prop()
  status: string;
  @Prop()
  statusMatching: number;
  @Prop()
  statusMatchingName: string;
  @Prop()
  tag: string;
  @Prop()
  type: string;
  @Prop()
  updateBy: string;
  @Prop()
  cosAi: number;
  @Prop()
  feedByUser: string;
  @Prop()
  typeUpdateBy: string;
  @Prop()
  contentType: string;
  @Prop()
  fileSize: number;
  @Prop()
  nameFile: string;
  @Prop()
  organizationId: string;
  @Prop()
  referalLink: string;
  @Prop()
  skill: string;
  @Prop()
  username: string;
  @Prop()
  usernameType: string;
  @Prop()
  linkCvRedacted: string;
  @Prop()
  redacted: number;
  @Prop()
  interest: number;
  @Prop()
  applyType: string;
  @Prop()
  feedDescription: string;
  @Prop({ type: Object || [] })
  feedItemIds: object | [];
  @Prop()
  candidateType: string;
  @Prop()
  appliedType: string;
  @Prop()
  overridingCvLink: string;
  @Prop()
  showContact: number;
  @Prop({ type: Object })
  analysis: object;
  @Prop()
  credits: number;
  @Prop()
  isSuggested: number;
  @Prop()
  paid: number;
  @Prop()
  suggestedCredits: number;
  @Prop()
  manualCredits: number;
  @Prop()
  aiInfo: string;
  @Prop()
  burntCredits: number;
  @Prop()
  haveRedactedLink: number;
  @Prop()
  ranking: string;
  @Prop()
  skills: string;
  @Prop()
  jobTitle: string;
  @Prop()
  marketValueCurrency: string;
  @Prop()
  expectedSalaryCurrency: string;
  @Prop()
  topCandidate: number;
  @Prop()
  totalPool: number;
  @Prop()
  hopScore: number;
  @Prop()
  aiMatchScore: number;
  @Prop()
  matchScore: number;
  @Prop()
  companyTypeId: number;
  @Prop()
  functionId: number;
  @Prop()
  industryId: number;
  @Prop()
  locationId: number;
  @Prop()
  marketValue: number;
  @Prop()
  expectedSalary: number;
  @Prop()
  aiMarketValue: number;
  @Prop()
  statusUnlock: number;
  @Prop()
  statusCodeAiUnlock: number;
  @Prop()
  updateStatusDate: Date;
  @Prop()
  originalCvId: string;
  @Prop()
  isTalent: number;
  @Prop()
  draftCandidate: number;
  @Prop()
  platform: number;
  @Prop()
  suggestedCvId: string;
  @Prop()
  cvHopin: Date;
  @Prop()
  countUnlockAi: number;
  @Prop()
  inactive: number;
  @Prop()
  burntApplicant: number;
  @Prop()
  countThumbdown: number;
  @Prop()
  cvsDuplicated: [];
  @Prop()
  hopinConfidence: string;
  @Prop()
  hopinSignal: string;
  @Prop()
  tpMatchType: string;
  @Prop()
  hopin: Date;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
