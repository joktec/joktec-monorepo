# Adapters

This directory contains adapter-based packages that abstract communication with underlying protocols or systems. These adapters provide a unified interface while supporting multiple backends or clients.

## Packages

- **cacher**: Unified cache adapter supporting Redis, Memcached, and in-memory cache clients.
- **mailer**: Email sending abstraction using SMTP-compatible clients like Nodemailer.
- **notifier**: Notification delivery adapter supporting FCM, APN, and other push services.
- **storage**: Object storage adapter based on S3 protocol, compatible with AWS S3, MinIO, DigitalOcean Spaces, etc.
