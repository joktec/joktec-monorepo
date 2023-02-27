# The JokTec Microservice templates using monorepo with Lerna, Nx and NestJS

## I/ Setup
### 1/ Prerequisites
- node >= 14.x.x
- yarn >= 1.22.x - Prefer recommended than npm
```shell
$ npm install -g yarn
```
- lerna (global) - Optional on Unix, required on Window
```shell
$ npm install -g lerna
```
- nx (global) - Optional on Unix, required on Window
```shell
$ npm install -g nx
```
- @nestjs/cli (global) - Optional on Unix, required on Window
```shell
$ npm install -g @nestjs/cli
```

### 2/ Install dependencies
Stand on the root project and run:
```shell
$ yarn install
# OR
$ yarn
```
It will be install all dependencies for all packages/ or apps/

### 3/ Build project/packages
```shell
# Build all packages in project (recommended for first installation)
$ yarn build
# Build a single package
$ yarn build --scope @joktec/core
# Build multiple packages
$ yarn build --scope @joktec/core --scope @joktec/graphql

```
P/S:
- After build core package, it will be link to other service automatically. So you don't need to copy build dir (/dist) to node_modules any more
- If don't have any changes in packages, and retry build again will be read from cached.

### 4/ Run project
```shell
$ yarn dev --scope @joktec/example-gateway
$ yarn dev --scope @joktec/example-micro 
```
If conflict port, goto each package will have config.yml file. Edit port in it and re-run
```yaml
gateway:
  port: 9010
  
micro:
  port: 8010
```
P/S: This only affect on your local, don't impact to deployment

## More information
TBD

## Contributors
Contributions to `@joktec/core` are welcome. If you would like to contribute, please fork the repository, make your changes, and submit a pull request.

Please make sure to update tests as appropriate.

# Integrate into CI / CD
TBD

# Access to EKS cluster
TBD
