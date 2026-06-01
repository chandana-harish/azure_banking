# Azure CLI Deployment Guide

## Prerequisites

- Azure CLI installed
- Node.js 20 or later
- A subscription with permissions to create networking, storage, PostgreSQL, Key Vault, and App Service resources

## Recommended Variables

```bash
set LOCATION=eastus2
set RG=rg-trustbank-demo
set VNET=vnet-trustbank-demo
set APPPLAN=asp-trustbank-demo
set APP=app-trustbank-demo
set STORAGE=trustbankevidence123
set KV=kv-trustbank-demo
set PG=pg-trustbank-demo
set LOGWS=log-trustbank-demo
```

## High-Level Steps

1. Create resource group.
2. Create VNet and subnets.
3. Create storage account with RA-GRS or RA-GZRS.
4. Enable versioning and soft delete.
5. Create blob containers.
6. Create PostgreSQL Flexible Server.
7. Create Key Vault and store secrets.
8. Create App Service plan and web app.
9. Enable managed identity.
10. Assign RBAC on storage.
11. Configure app settings.
12. Deploy the application.

## Resource Group

```bash
az group create --name %RG% --location %LOCATION%
```

## Storage Account

```bash
az storage account create ^
  --name %STORAGE% ^
  --resource-group %RG% ^
  --location %LOCATION% ^
  --sku Standard_RAGRS ^
  --kind StorageV2 ^
  --allow-blob-public-access false ^
  --https-only true ^
  --min-tls-version TLS1_2
```

## Containers

```bash
az storage container create --name kyc-documents --account-name %STORAGE% --auth-mode login
az storage container create --name transaction-receipts --account-name %STORAGE% --auth-mode login
az storage container create --name audit-records --account-name %STORAGE% --auth-mode login
az storage container create --name bank-statements --account-name %STORAGE% --auth-mode login
az storage container create --name exports --account-name %STORAGE% --auth-mode login
```

## Soft Delete and Versioning

```bash
az storage account blob-service-properties update ^
  --account-name %STORAGE% ^
  --resource-group %RG% ^
  --enable-delete-retention true ^
  --delete-retention-days 14 ^
  --enable-versioning true ^
  --enable-change-feed true ^
  --enable-container-delete-retention true ^
  --container-delete-retention-days 14
```

## App Service Identity

```bash
az webapp identity assign --name %APP% --resource-group %RG%
```

## RBAC

```bash
for /f "tokens=*" %i in ('az webapp identity show --name %APP% --resource-group %RG% --query principalId -o tsv') do set APP_PRINCIPAL=%i
for /f "tokens=*" %i in ('az storage account show --name %STORAGE% --resource-group %RG% --query id -o tsv') do set STORAGE_ID=%i
az role assignment create --assignee-object-id %APP_PRINCIPAL% --assignee-principal-type ServicePrincipal --role "Storage Blob Data Contributor" --scope %STORAGE_ID%
```

## App Settings

Configure the same keys shown in `.env.example` by using `az webapp config appsettings set`.

## Deploy

Use ZIP deploy or Deployment Center. After deployment, run Prisma deploy and seed using App Service console or CI/CD.
