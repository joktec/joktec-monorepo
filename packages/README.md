# 📦 JokTec Monorepo - Packages Overview

The JokTec monorepo is structured to support modular, scalable, and maintainable development of microservices. Packages are logically grouped by their responsibility and role in the system architecture. This separation of concerns improves reusability, dependency management, and code organization across a large distributed system.

---

## 🧩 Common

**Purpose:** Core building blocks, types, and shared logic used across the system.

- **utils**: Low-level utility functions and helpers (pure functions, validation, transformation, etc.).
- **types**: Shared TypeScript types and interfaces for cross-package consistency.
- **core**: Fundamental classes, services, decorators, and base modules for the platform.
- **cron**: Abstractions and decorators for scheduling and managing cron jobs.

---

## 🗄️ Databases

**Purpose:** Encapsulate interaction with different database engines, offering abstraction layers over native clients.

- **mysql**: Integration with MySQL relational databases.
- **mongo**: MongoDB abstraction using Mongoose/Typegoose.
- **arango**: Client wrapper for ArangoDB (multi-model database).
- **elastic**: Elasticsearch client abstraction for full-text search and analytics.
- **bigquery**: Google BigQuery integration for data warehousing and analytics queries.

---

## 🔗 Brokers

**Purpose:** Handle message passing and event-driven communication between microservices via messaging brokers.

- **kafka**: Kafka client abstraction for pub/sub and event streaming.
- **rabbit**: RabbitMQ client abstraction for queue-based messaging.
- **redcast**: Redis-based pub/sub messaging layer.
- **sqs**: AWS SQS client abstraction for distributed messaging via simple queues.

---

## 🔌 Adapters

**Purpose:** Provide protocol-level abstractions to interact with external systems without binding to specific service providers.

- **cacher**: Unified caching adapter supporting Redis, Memcached, and local memory caching.
- **mailer**: SMTP-based email sending abstraction, supporting pluggable mailer clients.
- **notifier**: Abstraction for sending push notifications via FCM, APNs, and other platforms.
- **storage**: S3 protocol-compatible object storage adapter for AWS S3, MinIO, and similar services.

---

## 🌐 Integrations

**Purpose:** Direct SDK integrations with third-party services, typically tightly coupled to external APIs.

- **firebase**: Firebase SDK integration for authentication, messaging, and database.
- **gpt**: OpenAI GPT API integration for AI-based text generation and processing.

---

## 🛠️ Tools

**Purpose:** Internal development tools and utilities that enhance developer experience and runtime operations.

- **alert**: Utility for sending alerts to communication platforms like Slack and Telegram.
- **file**: Local file system utilities for reading, writing, and manipulating files.
- **http**: HTTP client abstraction over Axios for making external REST API calls.

---

# 📚 Why This Structure?

- **Separation of Concerns**: Each group focuses on a single responsibility domain (core logic, database handling, messaging, external integrations, etc.).
- **Reusability**: Core modules (common, adapters) are reusable across multiple applications without tight coupling.
- **Scalability**: The architecture scales naturally by adding more adapters, integrations, or brokers without impacting core services.
- **Developer Productivity**: Clear modular separation makes it easier to navigate, maintain, and extend the codebase.

---
