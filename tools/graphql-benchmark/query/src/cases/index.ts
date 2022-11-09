import { BenchmarkRunner } from '../main';
import {
  GlobalConfig,
  BenchmarkTool,
  MaxRequestsInDurationBenchmark,
  FixedRequestNumberBenchmark,
  RequestsPerSecondBenchmark,
  MultiStageBenchmark,
} from '../executors/base/types';
import queries from './queries';

const rpsBench: RequestsPerSecondBenchmark = {
  tools: [BenchmarkTool.AUTOCANNON],
  name: 'MiscData',
  execution_strategy: 'REQUESTS_PER_SECOND',
  duration: '60s',
  rps: 100,
  connections: 10,
  query: queries.miscData,
};

// wrk2 can't handle a fixed request number benchmark
const fixedReqBench: FixedRequestNumberBenchmark = {
  tools: [BenchmarkTool.AUTOCANNON],
  name: 'MiscData',
  execution_strategy: 'FIXED_REQUEST_NUMBER',
  requests: 1000,
  query: queries.miscData,
};

const maxReqInDurationBench: MaxRequestsInDurationBenchmark = {
  tools: [BenchmarkTool.AUTOCANNON],
  name: 'MiscData',
  execution_strategy: 'MAX_REQUESTS_IN_DURATION',
  duration: '10s',
  query: queries.miscData,
};

const multiStageBench: MultiStageBenchmark = {
  tools: [BenchmarkTool.AUTOCANNON],
  name: 'MiscData',
  execution_strategy: 'MULTI_STAGE',
  query: queries.miscData,
  initial_rps: 0,
  stages: [
    {
      duration: '5s',
      target: 100,
    },
    {
      duration: '5s',
      target: 1000,
    },
    {
      duration: '3s',
      target: 300,
    },
    {
      duration: '5s',
      target: 0,
    },
  ],
};

/**
 * Set up the global benchmark config
 */

const tests: GlobalConfig = {
  // url: 'http://localhost:8081/graphql',
  url: 'https://public-jobhop-dev.jobhopin.com/graphql',
  headers: {
    'Content-Type': 'application/json',
    'X-Hasura-Admin-Secret': 'my-secret',
  },
  queries: [
    rpsBench,
    // fixedReqBench,
    // maxReqInDurationBench,
    // multiStageBench
  ],
};

async function main() {
  const runner = new BenchmarkRunner(tests);
  const results = await runner.runBenchmarks();
  console.log('Test results:', results);
}

main().catch((err) => {
  console.log('Error running tests');
});
