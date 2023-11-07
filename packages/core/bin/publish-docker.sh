#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

program
    .version('0.0.1')
    .option('--npm-token <token>', 'NPM Token')
    .option('--docker-dir <dir>', 'Docker File Dir');

program.parse(process.argv);
const options = program.opts();

const { execSync } = require('child_process');

const DOCK_REGISTRY = 'registry.joktec.com';

const pkg = JSON.parse(fs.readFileSync('./package.json').toString())
const name = pkg.name.replace('@','').replace('/', '-');
execSync(`docker build -t ${DOCK_REGISTRY}/${name}:${pkg.version} --build-arg NPM_TOKEN=${options.npmToken} ${options.dockerDir}`, {stdio: 'inherit'});
execSync(`docker push ${DOCK_REGISTRY}/${name}:${pkg.version}`, {stdio: 'inherit'});
