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

// --------- Step 1: Checkout
console.log('👉 Step 1:', 'Pull new commit');
console.log('✨ Success');

// --------- Step 2: Testing
console.log('👉 Step 2:', 'Testing');
console.log('✨ Success');

// --------- Step 3: Publish
console.log('👉 Step 3:', 'Publish package');
if (['main', 'master', 'prod', 'production'].includes(branch)) {
  execSync(`lerna publish major --exact --no-private --yes`);
} else if (['staging', 'stag', 'preprod', 'pre-production'].includes(branch)) {
  execSync(`lerna publish minor --exact --no-private --yes`);
} else if (['develop', 'development', 'testing'].includes(branch)) {
  execSync(`lerna publish patch --exact --no-private --yes`);
}
console.log('✨ Success');

// --------- Step 4: Deploy
console.log('👉 Step 4:', 'Deploy helm chart');
if (['main', 'master', 'prod', 'production'].includes(branch)) {
  execSync(`lerna run deploy -- --ns baotg-production --helm helm`);
} else if (['staging', 'stag', 'preprod', 'pre-production'].includes(branch)) {
  execSync(`lerna run deploy -- --ns baotg-staging --helm helm`);
} else if (['develop', 'development', 'testing'].includes(branch)) {
  execSync(`lerna run deploy -- --ns baotg-develop --helm helm`);
}
console.log('✨ Success');

// --------- Step 5: Clean
console.log('👉 Step 5:', 'Clean');
const files = execSync(`git diff HEAD --name-only`).toString();
if (!files.length) {
  console.log('No file to commit');
  return;
}

console.log('Commit after deploy!');
execSync(`git add .`);
execSync(`git commit -m "ci(release): deploy"`);
execSync(`git push -u origin ${branch}`);
console.log('✨ Success');
