<h3 align="center">JokTec - A Powerful Monorepo for Microservices with NestJS</h3>

<p align="center">
  JokTec is a modular, scalable, and developer-friendly monorepo architecture built with <strong>NestJS</strong>. It provides a solid foundation for developing microservices by organizing shared libraries, adapters, integrations, and services in a clear, maintainable structure.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="license" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square"/>
  </a>
</p>

---

## 📁 Project Structure

```
joktec-monorepo/
├── apps/                # Microservice applications (gateways, workers, etc.)
│   ├── example-gateway/
│   └── example-micro/
└── packages/            # Reusable shared libraries and modules
    ├── adapters/        # Protocol-based abstractions (cache, storage, mail, notify, ...)
    ├── brokers/         # Messaging brokers (Kafka, RabbitMQ, etc.)
    ├── common/          # Shared utilities, types, core services
    ├── databases/       # Database clients and query layers
    ├── integrations/    # 3rd-party service integrations (Firebase, GPT, ...)
    └── tools/           # Internal utilities (file, http, alert, etc.)
```

---

## 🚀 Quick Start

### 1️⃣ Prerequisites

- Node.js >= 14.x.x
- Yarn >= 1.22.x _(preferred over npm)_
- Optional (required for Windows):
  ```bash
  npm install -g lerna nx @nestjs/cli
  ```

### 2️⃣ Install Dependencies

From the project root:

```bash
yarn install
```

This installs all dependencies for all packages and apps in the monorepo.

### 3️⃣ Build the Project

```bash
# Build everything
yarn build

# Build a specific package
yarn build --scope @joktec/core

# Build multiple packages
yarn build --scope @joktec/core --scope @joktec/gpt
```

💡 Tip:
- Packages are auto-linked after build, no need to manually copy `dist/`.
- Nx caching ensures re-building is fast when nothing has changed.

### 4️⃣ Run an App in Dev Mode

```bash
yarn dev --scope @joktec/example-gateway
yarn dev --scope @joktec/example-micro
```

You can customize port and other config by editing the `config.yml` file inside each app:

```yaml
gateway:
  port: 9010

micro:
  port: 8010
```

✅ This config only affects local development and does not impact deployment.

---

## 📚 Documentation

Coming soon! Stay tuned.

---

## 🙌 Contributing

We welcome contributions to `@joktec/*` packages.  
To contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please include tests when possible and follow the code style used in the repo.

---

## 🚨 Issues

Found a bug or have a feature request?  
Please open an issue on [GitHub](https://github.com/your-repo-link).

---

## ⭐ Like What We're Building?

Star this repo to show your support!

---

## 📄 License

All packages in this repository are licensed under the [MIT License](https://opensource.org/licenses/MIT).
