export enum JobStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  TODO = 'TODO',
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
