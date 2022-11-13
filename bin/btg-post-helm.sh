#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('0.0.1')
  .option('--chart-dir <token>', 'Chart Dir');

program.parse(process.argv);
const options = program.opts();

const { execSync } = require('child_process');

const files = execSync(`git diff HEAD --name-only`).toString().split(`\n`);
console.log(files);

if (!files.length) {
  return;
}

execSync(`git add .`);
execSync(`git commit -m "ci(release): deploy"`);
execSync(`git push -u origin main`);
