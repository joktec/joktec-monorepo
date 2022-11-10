#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

const pkgName = process.env["SERVICE_PACKAGE_NAME"]
const pkgVersion = process.env["SERVICE_PACKAGE_VERSION"]
const name = pkgName.replace('@','').replace('/', '-');
execSync(`npm pack ${pkgName}@${pkgVersion}`, {stdio: 'inherit'})
execSync(`ls`, {stdio: 'inherit'})
console.log("__dirname", __dirname)

execSync(`tar -zxvf ${__dirname}/${name}-${pkgVersion}.tgz`, {stdio: 'inherit'})
execSync(`mv ./package/* ./`, {stdio: 'inherit'})
execSync(`rm -rf ./package`, {stdio: 'inherit'})
execSync(`rm -rf ${__dirname}/${name}-${pkgVersion}.tgz`, {stdio: 'inherit'})

execSync(`yarn install`, {stdio: 'inherit'})
execSync(`HTTP_PORT=9010 GRPC_PORT=8010 yarn start`, {stdio: 'inherit'})
