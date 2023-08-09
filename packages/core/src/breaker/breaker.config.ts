import { Bucket, Options, State, Stats } from 'opossum';

export class BreakerBucket implements Bucket {
  cacheHits: number;
  cacheMisses: number;
  failures: number;
  fallbacks: number;
  fires: number;
  latencyTimes: number[];
  percentiles: { [p: number]: number };
  rejects: number;
  semaphoreRejections: number;
  successes: number;
  timeouts: number;

  constructor(props: Partial<BreakerBucket>) {
    Object.assign(this, props);
  }
}

export class BreakerStats extends BreakerBucket implements Stats {
  latencyMean: number;

  constructor(props: Partial<BreakerStats>) {
    super(props);
    Object.assign(this, props);
  }
}

export class BreakerState implements State {
  closed: boolean;
  enabled: boolean;
  halfOpen: boolean;
  lastTimerAt: symbol;
  name: string;
  open: boolean;
  shutdown: boolean;
  warmUp: boolean;

  constructor(props: Partial<BreakerState>) {
    Object.assign(this, props);
  }
}

export class BreakerConfig implements Options {
  timeout?: number;
  resetTimeout?: number;
  errorThresholdPercentage?: number;
  rollingCountTimeout?: number;
  rollingCountBuckets?: number;
  rollingPercentilesEnabled?: boolean;
  capacity?: number;
  volumeThreshold?: number;
  allowWarmUp?: boolean;
  enabled?: boolean;
  name?: string;
  group?: string;
  errorFilter?: (error: Error) => any;

  constructor(props: Partial<BreakerConfig>) {
    Object.assign(this, props);
  }
}
