export enum JobStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
}

export interface IJobModel {
  id: string;
  code: string;
  type: string;
  date: string;
  startedAt: Date;
  finishedAt: Date;
  data?: Record<string, any>;
  status: JobStatus;
}
