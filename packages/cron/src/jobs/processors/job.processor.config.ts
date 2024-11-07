export class JobProcessorConfig {
  concurrent?: number = 1;
  batchSize?: number = 1;
  maxRetries?: number = 3;
  retryTimeout?: number = 15000;

  constructor(props?: Partial<JobProcessorConfig>) {
    Object.assign(this, { ...props });
  }
}
