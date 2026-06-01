# Architecture Guide

## Overview

The application is a single Next.js deployment that serves both UI pages and backend API routes from Azure App Service.

## Services

- Azure App Service
- Azure PostgreSQL Flexible Server
- Azure Storage Account with Blob service
- Azure Key Vault
- Azure Application Insights
- Azure Log Analytics
- Azure Virtual Network
- Private Endpoint and Private DNS Zone

## Runtime Flow

1. User sends HTTPS request to App Service.
2. Next.js route handler validates the session and request.
3. PostgreSQL Flexible Server stores or reads customer, account, transaction, and document metadata.
4. For deposit and withdrawal flows, the app generates a PDF receipt and JSON audit evidence.
5. App Service uploads evidence to Blob Storage using Managed Identity.
6. Blob metadata, path, checksum, and version ID are recorded in PostgreSQL.

## Security Model

- Blob containers remain private.
- App Service uses system-assigned managed identity.
- RBAC grants `Storage Blob Data Contributor` on the storage account.
- Database secrets can live in Key Vault and be surfaced through App Service configuration references.
- App Service should use VNet integration for private connectivity.
- PostgreSQL Flexible Server and Storage Account should use private access where possible.

## Data Model Summary

- `users`: credentials and role
- `customers`: customer profile
- `accounts`: bank account and available balance
- `transactions`: deposit and withdrawal ledger
- `blob_documents`: receipt, audit, statement, and KYC blob references
- `audit_records`: JSON audit records and event metadata
