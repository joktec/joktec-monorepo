#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('0.0.1')
  .option('--chart-dir <token>', 'Chart Dir');

program.parse(process.argv);
const options = program.opts();

const { execSync } = require('child_process');

const branch = execSync(`git rev-parse --abbrev-ref HEAD`).toString().trim();

if (['main', 'master', 'prod', 'production'].includes(branch)) {
  execSync(`lerna publish major --exact --no-private --yes`);
} else if (['staging', 'stag', 'preprod', 'pre-production'].includes(branch)) {
  execSync(`lerna publish minor --exact --no-private --yes`);
} else if (['develop', 'development', 'testing'].includes(branch)) {
  execSync(`lerna publish patch --exact --no-private --yes`);
} else {
  return;
}
