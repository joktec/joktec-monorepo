<div align="center">
  <h1>@joktec/http</h1>
  <p>A NestJS library that provides a wrapper around the `axios` and `@nestjs/axios` libraries for making HTTP requests.</p>
</div>

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Reference](#reference)
5. [Contributing](#contributing)

## Introduction
`@joktec/http` is a library used for making HTTP requests, based on NestJS. It is a wrapper for `axios` and `@nestjs/axios`, providing an easy-to-use interface for creating HTTP clients with NestJS.

## Installation
To install this library, use either `npm` or `yarn`:

```bash
npm install -S @joktec/http
# or
yarn add -S @joktec/http
```

## Getting Started
### Configuration
`@joktec/http` uses a configuration file to set up the default options for the HTTP client. Create a config.yml file in the root of your project, and add the following configuration options:
```yaml
http:
  baseURL: https://mydomain.com
  method: GET
  timeout: 30000
  auth:
    username: myuser
    password: mypass
  raxConfig:
    retry: 3
```
Update the values according to your HTTP client details. The raxConfig option is using the retry-axios package to automatically retry failed requests.

### Module
Once you have provided the configuration, you can import the `HttpModule` in your `AppModule`:
```typescript
import { Module } from '@joktec/core';
import { HttpModule } from '@joktec/http';

@Module({
  imports: [
    // ...
    HttpModule,
    // ...
  ],
})
export class AppModule {}
```

### Service
You can then use the HttpService and do any request:

```typescript
import { Injectable } from '@joktec/core';
import { HttpService, HttpResponse, HttpRequest } from '@joktec/http';

@Injectable()
export class MyService {
  constructor(private readonly httpService: HttpService) {
  }

  async request(): Promise<HttpResponse<any>> {
    return this.httpService.request<any>({
      method: 'GET',
      baseURL: '',
      url: '',
      data: {
        // ...input data
      }
      // ... input config
    });
  }

  async upload(): Promise<HttpResponse<any>> {
    const file = new File();
    const req: HttpRequest = {
      method: 'POST',
      baseURL: '',
      url: '',
      formData: {
        file: file,
      },
      // ... input config
    };
    return this.httpService.upload<any>(req);
  }
}
```

## Reference
[axios](https://axios-http.com/docs/intro)

[@nestjs/axios](https://docs.nestjs.com/techniques/http-module)

[retry-axios](https://www.npmjs.com/package/retry-axios)

## Contributing
Contributions to `@joktec/http` are welcome. If you would like to contribute, please fork the repository, make your changes, and submit a pull request.

Please make sure to update tests as appropriate.
