export enum JobStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
}

export abstract class JobModel {
  id: string;
  type: string;
  date: string;
  status: JobStatus;
  data?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}
