export enum JobStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface IJobModel<T extends object = Record<string, any>> {
  code: string;
  type: string;
  date: string;
  startedAt: Date;
  finishedAt: Date;
  data?: T;
  status: JobStatus;
}
