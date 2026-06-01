# Security Guide

## Core Security Controls

- HTTPS-only access to the web application
- HTTP-only session cookie for authenticated users
- Private blob containers with no anonymous access
- Managed Identity for App Service to access Blob Storage
- RBAC with `Storage Blob Data Contributor`
- PostgreSQL used as the system of record for balances and transaction history
- Key Vault for secret storage
- Soft delete and blob versioning for evidence recovery
- Least privilege role assignments

## Why Managed Identity Matters

Managed Identity removes the need to embed storage account keys in the application for the preferred deployment path. App Service receives an Azure AD-backed identity, and RBAC grants only the storage permissions it needs.

## Recommended Production Settings

- Restrict App Service inbound access if your enterprise architecture requires it.
- Use VNet integration and private endpoints for storage and PostgreSQL.
- Store `DATABASE_URL` and `SESSION_SECRET` in Key Vault-backed app settings.
- Enable diagnostic logs, Application Insights, and alerting.
- Keep blob containers private and mediate downloads through the application.
- Turn on blob versioning, soft delete, and change feed.

## Compliance-Friendly Evidence Pattern

- PostgreSQL contains the authoritative financial ledger.
- Blob Storage contains supporting evidence files.
- Each blob reference is indexed in PostgreSQL with:
  - blob path
  - container name
  - checksum
  - version ID
  - document type
  - transaction linkage

This split helps preserve transactional integrity while still supporting immutable-style audit evidence and storage lifecycle optimization.
