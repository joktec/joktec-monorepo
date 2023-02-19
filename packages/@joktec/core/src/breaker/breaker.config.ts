export interface BreakerConfig {
  timeout?: number;
  resetTimeout?: number;
  errorThresholdPercentage?: number;
  rollingCountTimeout?: number;
  rollingCountBuckets?: number;
  rollingPercentilesEnabled?: boolean;
  capacity?: number;
  errorFilter?: (error: Error) => any;
  volumeThreshold?: number;
  allowWarmUp?: boolean;
  state?: {
    enabled?: boolean;
    warmUp?: any;
    closed?: boolean;
    shutdown?: boolean;
  };
  enabled?: boolean;
  name?: string;
  group?: string;
}
