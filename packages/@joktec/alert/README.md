<div align="center">
  <h1>joktec-alert</h1>
  <p>Core Libraries such as type definitions, api clients and utils serving for backend services and frontend services</p>
</div>

## Installation

Use the package manager to install @joktec/alert (if you have been published to npm registry)

```bash
yarn add @joktec/alert
```

## Local Development
For development, a package can be linked into another project. This is often useful to test out new features

```bash
  cd joktec-core
  yarn link
```

Use `yarn link @joktec/alert` to link another package that you’d like to test into your current project.

## Usage

```javascript
import { isDev } from '@joktec/alert/dist/utils';

isDev();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
