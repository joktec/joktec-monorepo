import { CandidateStatus } from './enum';

export const ALLOWED_STATUS = {
  NEW: [
    CandidateStatus.SCREENING,
    CandidateStatus.INTERVIEWING,
    CandidateStatus.OFFERED,
    CandidateStatus.HIRED,
    CandidateStatus.REJECTED,
    CandidateStatus.WITHDREW,
  ],
  FED: [
    CandidateStatus.SCREENING,
    CandidateStatus.INTERVIEWING,
    CandidateStatus.OFFERED,
    CandidateStatus.HIRED,
    CandidateStatus.REJECTED,
    CandidateStatus.WITHDREW,
  ],
  SCREENING: [
    CandidateStatus.INTERVIEWING,
    CandidateStatus.PROBATION,
    CandidateStatus.OFFERED,
    CandidateStatus.HIRED,
    CandidateStatus.REJECTED,
    CandidateStatus.WITHDREW,
  ],
  INTERVIEWING: [
    CandidateStatus.OFFERED,
    CandidateStatus.PROBATION,
    CandidateStatus.HIRED,
    CandidateStatus.REJECTED,
    CandidateStatus.WITHDREW,
  ],
  OFFERED: [
    CandidateStatus.PROBATION,
    CandidateStatus.HIRED,
    CandidateStatus.REJECTED,
    CandidateStatus.WITHDREW,
  ],
  PROBATION: [
    CandidateStatus.HIRED,
    CandidateStatus.REJECTED,
    CandidateStatus.WITHDREW,
  ],

  HIRED: [],
  REJECTED: [],
  WITHDREW: [],
};
