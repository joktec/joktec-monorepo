#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .version('0.0.1')
  .option('--chart-dir <token>', 'Chart Dir');

program.parse(process.argv);
const options = program.opts();

const { execSync } = require('child_process');

const files = execSync(`git diff HEAD --name-only`).toString().trim();
if (!files.length) {
  console.log('No file to commit');
  return;
}

console.log('Commit after deploy!');
execSync(`git add .`);
execSync(`git commit -m "ci(release): deploy"`);
execSync(`git push -u origin main`);
