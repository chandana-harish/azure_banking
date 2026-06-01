# Bank Document & Transaction Evidence Storage System

A production-like, monolithic Next.js banking demo that uses PostgreSQL as the system of record and Azure Blob Storage for transaction receipts and audit evidence.

## Features

- Customer registration and login
- Banking dashboard with balance, transactions, and evidence status
- Deposit and withdrawal workflows
- PostgreSQL-backed transaction ledger
- PDF receipt generation per transaction
- JSON audit record generation per transaction
- Azure Blob Storage uploads with metadata, checksum, version ID support, and private access
- Admin audit page
- Blob storage demo and architecture pages
- Azure deployment and operations documentation

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Prisma ORM
- PostgreSQL Flexible Server
- Azure Blob Storage SDK
- Azure Managed Identity via `DefaultAzureCredential`
- PDFKit for receipt generation

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
copy .env.example .env
```

3. Set up PostgreSQL and Azure Storage values in `.env`.

4. Run Prisma migration and seed:

```bash
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
```

5. Start the app:

```bash
npm run dev
```

6. Open `http://localhost:3000`.

## Seeded Accounts

- Customer: `customer@trustbank.demo` / `Customer123!`
- Admin: `admin@trustbank.demo` / `Admin12345!`

## Project Structure

```text
prisma/                  Database schema, migration, seed
src/app/                 Pages and API route handlers
src/components/          UI shell and reusable components
src/lib/                 Auth, database, Azure blob, banking domain logic
docs/                    Azure architecture and deployment documentation
```

## Transaction Evidence Flow

1. User initiates deposit or withdrawal.
2. App validates the request and loads the PostgreSQL account record.
3. PostgreSQL transaction stores the banking entry and updates the balance.
4. App generates a PDF receipt and JSON audit file.
5. App uploads both artifacts to private Azure Blob Storage containers.
6. App stores blob metadata, path, URL, version ID, and checksum in PostgreSQL.
7. User or admin downloads the file through a short-lived, secure read URL.

## Documentations

- [Architecture Guide](docs/architecture.md)
- [Azure Portal Deployment Guide](docs/azure-portal-guide.md)
- [Azure CLI Deployment Guide](docs/azure-cli-guide.md)
- [Traffic Flow Guide](docs/traffic-flow.md)
- [Security Guide](docs/security.md)
- [Geo-Replication Demo Guide](docs/geo-replication.md)
- [Lifecycle Policy Guide](docs/lifecycle-policy.md)
- [Troubleshooting Guide](docs/troubleshooting.md)

## Notes

- PostgreSQL is the system of record for balances and transactions.
- Blob Storage is used for evidence objects only.
- Managed Identity is the preferred authentication method for Blob Storage.
- Private endpoints, RBAC, soft delete, and versioning are covered in the documentation.
