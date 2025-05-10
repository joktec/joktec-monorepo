<h1 align="center">JokTec Monorepo</h1>

<p align="center">
  Modular microservice architecture built on <b>NestJS</b> — designed to be scalable, organized, and developer-friendly.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
  <a href="https://deepwiki.com/joktec/joktec-monorepo">
    <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki" />
  </a>
</p>

---

## 🧩 Overview

JokTec is a monorepo that provides a clean structure for building scalable microservices. It is structured around modular packages and clearly separated concerns.

This repo includes:
- 🧱 **Reusable packages**: organized into adapters, brokers, databases, integrations, and tools
- 🚀 **Microservice applications**: located in the `apps/` folder
- 📦 **Shared core logic**: organized in the `packages/common/` directory

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

## 🚀 Getting Started

> For detailed documentation, visit our [Wiki](https://your-wiki-link) or [GitBook](https://your-gitbook-link).

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Run an app in development
yarn dev --scope @joktec/example-gateway
```

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
