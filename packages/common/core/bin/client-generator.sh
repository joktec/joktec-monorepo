#!/usr/bin/env node

const glob = require('glob');
const {camelCase, upperFirst, snakeCase, kebabCase} = require('lodash');
const fs = require('fs');
const path = require('path');
const doT = require('dot');
const files = glob.sync(`src/**/*.proto`);
const { execSync } = require('child_process');
const { Command } = require('commander');

const program = new Command();
program
    .version('0.0.1')
    .option('--client-dir <dir>', 'Client Dir: default ..');

program.parse(process.argv);
const options = program.opts();

const protoPkgs = files.map(file => fs.readFileSync(file).toString().match(/package (.*);/)[1]);

const { name, version } = JSON.parse(fs.readFileSync('package.json').toString());

const capCase = (t) => upperFirst(camelCase(t))
const snkCase = (t) => snakeCase(t).toUpperCase()

const clientTplRootDir = `${__dirname}/../templates/client`;
const clientProviderTpl = doT.template(fs.readFileSync(`${clientTplRootDir}/src/client.provider.ts`).toString());

const clientsRootDir = options.clientDir ?? '..'
const clientName = name.match(/\/(.*)-service/)[1];
const clientDir = `${clientsRootDir}/${clientName}-client`;

// create client folder
if (!fs.existsSync(clientDir)) fs.mkdirSync(clientDir);
if (!fs.existsSync(`${clientDir}/src`)) fs.mkdirSync(`${clientDir}/src`);
if (!fs.existsSync(`${clientDir}/src/protos`)) fs.mkdirSync(`${clientDir}/src/protos`);
fs.copyFileSync(`${clientTplRootDir}/tsconfig.json`, `${clientDir}/tsconfig.json`);
fs.copyFileSync(`${clientTplRootDir}/src/client.config.ts`, `${clientDir}/src/client.config.ts`);
fs.copyFileSync(`${clientTplRootDir}/src/config.ts`, `${clientDir}/src/config.ts`);
fs.copyFileSync(`${clientTplRootDir}/nest-cli.json`, `${clientDir}/nest-cli.json`);

// generate package.json
const pkgTpl = doT.template(fs.readFileSync(`${clientTplRootDir}/package.json.template`).toString());
fs.writeFileSync(`${clientDir}/package.json`, JSON.stringify(JSON.parse(pkgTpl({ clientName, version })), null, 2));

// generate constant file
const constantsTpl = doT.template(fs.readFileSync(`${clientTplRootDir}/src/constants.ts`).toString());

fs.writeFileSync(`${clientDir}/src/constants.ts`, constantsTpl({
  package: clientName,
  protoPackages: protoPkgs,
  capCase, snkCase, camelCase, kebabCase
}));

// generate client module file
const moduleTpl = doT.template(fs.readFileSync(`${clientTplRootDir}/src/client.module.ts`).toString());

fs.writeFileSync(`${clientDir}/src/${clientName}-client.module.ts`, moduleTpl({
  package: clientName,
  packages: JSON.stringify(protoPkgs),
  protoPath: JSON.stringify(files),
  providers: protoPkgs.map(p => `${p}-client.provider`),
  version, capCase, snkCase, camelCase, kebabCase
}));

// generate provider files
const providerTpl = doT.template(fs.readFileSync(`${clientTplRootDir}/src/client.provider.ts`).toString());

for (let p of protoPkgs) {
  fs.writeFileSync(`${clientDir}/src/${kebabCase(p)}-client-provider.ts`, providerTpl({
    package: clientName,
    protoPackage: p,
    capCase, snkCase, camelCase, kebabCase
  }));
}

// generate index file
const indexTpl = doT.template(fs.readFileSync(`${clientTplRootDir}/src/index.ts`).toString());

fs.writeFileSync(`${clientDir}/src/index.ts`, indexTpl({
  package: clientName,
  protoPackages: protoPkgs,
  capCase, snkCase, camelCase, kebabCase
}));

// move file protos
for (let file of files) {
  fs.copyFileSync(path.resolve(file), `${clientDir}/src/protos/${path.basename(file)}`)
}

execSync(`tsproto --path ${clientDir}/src`, {stdio: 'inherit'})
