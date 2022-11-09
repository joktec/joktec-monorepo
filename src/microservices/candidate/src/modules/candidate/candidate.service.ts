import { firstValueFrom } from 'rxjs';
import { Candidate, CandidateDocument } from './schemas/candidate.schema';

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccountGroupMessagePattern,
  AssignedJobMessagePattern,
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  CommonMicroserviceConfig,
  ICustomConditionQuery,
  JobMessagePattern,
  JobMicroserviceConfig,
  RecruiterMessagePattern,
  RecruiterMicroserviceConfig,
  UserMicroserviceConfig,
} from '@jobhopin/core';
import { ClientProxy } from '@nestjs/microservices';
import { CandidateStatus } from '../../enum';
import {
  AccountGroupEnum,
  StatusEnum,
  NOT_DELETED,
  NOT_DRAFT_CANDIDATE,
} from '../../constants';

interface ConditionInput extends BaseConditionInput {
  userId?: string;
  jobId?: string;
  platform?: string;
  status?: string;
}
interface ConditionCandidateInput extends BaseConditionInput {
  jobId?: string[];
  status?: any;
  deleted?: number;
  draftCandidate?: number;
}

const jobMicroserviceConfig = new JobMicroserviceConfig();
const recruiterMicroserviceConfig = new RecruiterMicroserviceConfig();
const userMicroserviceConfig = new UserMicroserviceConfig();
const commonMicroserviceConfig = new CommonMicroserviceConfig();
@Injectable()
export class CandidateService extends BaseService<CandidateDocument> {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
    @Inject(jobMicroserviceConfig.name)
    private readonly jobMicroservice: ClientProxy,
    @Inject(recruiterMicroserviceConfig.name)
    private readonly recruiterMicroservice: ClientProxy,
    @Inject(userMicroserviceConfig.name)
    private readonly userMicroservice: ClientProxy,
    @Inject(commonMicroserviceConfig.name)
    private readonly commonMicroservice: ClientProxy,
  ) {
    super(candidateModel);
  }

  async query(
    condition: ConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    try {
      const conditionFilterCandidate = await this.getCondition(condition);

      const candidateData = await super.query(
        conditionFilterCandidate,
        pagination,
        customCondition,
      );

      const { items: candidates } = candidateData;

      const counts = {
        all: candidates.length,
        hired: this.countStatus(candidates, StatusEnum.HIRED),
        interviewing: this.countStatus(candidates, StatusEnum.INTERVIEWING),
        new:
          this.countStatus(candidates, StatusEnum.NEW) +
          this.countStatus(candidates, StatusEnum.FED),
        offered: this.countStatus(candidates, StatusEnum.OFFERED),
        probation: this.countStatus(candidates, StatusEnum.PROBATION),
        rejected: this.countStatus(candidates, StatusEnum.REJECTED),
        screening: this.countStatus(candidates, StatusEnum.SCREENING),
        withdrew: this.countStatus(candidates, StatusEnum.WITHDREW),
      };

      return { ...candidateData, counts };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  countStatus(candidates, status: string): number {
    if (!Array.isArray(candidates)) return 0;
    if (candidates?.length === 0) return 0;

    return candidates.reduce(
      (counts, item) => counts + (item.status === status ? 1 : 0),
      0,
    );
  }

  async getCondition(condition): Promise<ConditionCandidateInput> {
    try {
      const { platform, userId } = condition;

      let jobIds: string[] = [];
      if (condition.jobId) {
        jobIds = [condition.jobId];
      } else {
        const { items: recruiters } = await firstValueFrom(
          this.recruiterMicroservice.send(RecruiterMessagePattern.LIST, {
            condition: {
              userId: userId,
            },
            pagination: {
              pageSize: 1000,
            },
          }),
        );

        const organizationIds: string[] = recruiters.map(
          (re) => re.organizationId,
        );
        const { items: jobs } = await firstValueFrom(
          this.jobMicroservice.send(JobMessagePattern.LIST, {
            condition: {
              organizationId: organizationIds,
              platform: platform,
            },
            pagination: {
              pageSize: 1000,
            },
          }),
        );
        jobIds = jobs.map((job) => job._id);
      }

      const newCondition = { ...condition };
      delete newCondition.userId;
      delete newCondition.platform;
      delete newCondition.jobId;
      delete newCondition.status;

      let filterStatus: any = {
        status: {
          $nin: [CandidateStatus.DRAFT, CandidateStatus.ARCHIVED],
        },
      };
      if (condition.status) {
        if (condition.status === CandidateStatus.NEW) {
          filterStatus = {
            status: {
              $in: [CandidateStatus.NEW, CandidateStatus.FED],
            },
          };
        } else {
          filterStatus = {
            status: condition.status,
          };
        }
      }

      const codename = await firstValueFrom(
        this.userMicroservice.send(
          AccountGroupMessagePattern.GET_CODENAME_BY_USER_ID,
          userId,
        ),
      );
      if (
        codename.includes(AccountGroupEnum.ADMIN) ||
        codename.includes(AccountGroupEnum.OWNER)
      ) {
        const { items: assignedJob } = await firstValueFrom(
          this.commonMicroservice.send(AssignedJobMessagePattern.LIST, {
            condition: {
              jobId: {
                $in: jobIds,
              },
            },
          }),
        );

        jobIds = assignedJob
          .filter((item) => item.userId === userId)
          .map((item) => item.jobId);
      }

      const conditionFilterCandidate: ConditionCandidateInput = {
        ...newCondition,
        ...filterStatus,
        jobId: jobIds,
        draftCandidate: NOT_DRAFT_CANDIDATE,
        deleted: NOT_DELETED,
      };

      return conditionFilterCandidate;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
