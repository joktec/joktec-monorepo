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
  status: JobStatus;
  data?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
