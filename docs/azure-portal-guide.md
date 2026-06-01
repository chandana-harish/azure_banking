# Azure Portal Deployment Guide

This guide is intentionally detailed so you can demo the entire architecture from the Azure Portal.

## 1. Create a Resource Group

1. Sign in to the Azure Portal.
2. In the top search bar, type `Resource groups`.
3. Click `Resource groups`.
4. Click `Create`.
5. Under `Subscription`, choose your target subscription.
6. Under `Resource group`, enter a name such as `rg-trustbank-demo`.
7. Under `Region`, choose a region such as `East US 2`.
8. Click `Review + create`.
9. Click `Create`.
10. Wait for deployment to complete, then click `Go to resource group`.

## 2. Create the Virtual Network

1. In the portal search bar, type `Virtual networks`.
2. Click `Virtual networks`.
3. Click `Create`.
4. Select the same subscription and resource group.
5. Enter `vnet-trustbank-demo` as the name.
6. Choose the same region as the resource group.
7. Click `Next: IP Addresses`.
8. Leave the default address space or define one such as `10.10.0.0/16`.
9. Create at least these subnets:
   - `snet-appservice-integration` for App Service VNet integration
   - `snet-private-endpoints` for private endpoints
   - `snet-postgres` if you are using delegated subnet deployment for PostgreSQL Flexible Server
10. Click `Review + create`.
11. Click `Create`.

## 3. Create PostgreSQL Flexible Server

1. Search for `Azure Database for PostgreSQL flexible servers`.
2. Click `Create`.
3. Choose the same subscription and resource group.
4. Enter a server name like `pg-trustbank-demo`.
5. Select the same region.
6. Choose `PostgreSQL 16` or the latest stable supported version available in your tenant.
7. Under workload type, select a demo-appropriate tier such as `Burstable` or a small `General Purpose` size.
8. Set admin username and password, or integrate with your preferred enterprise pattern.
9. Click `Next: Networking`.
10. Prefer `Private access (VNet Integration)` if your subscription setup supports it for the demo.
11. Select the VNet and delegated subnet created for PostgreSQL.
12. If private access is not practical for the first run, use public access temporarily and restrict firewall rules to your IP and the App Service outbound path while you complete the demo.
13. Click `Review + create`.
14. Click `Create`.
15. After deployment, open the server and note the fully qualified hostname for `DATABASE_URL`.

## 4. Create the Storage Account

1. Search for `Storage accounts`.
2. Click `Create`.
3. Choose the same subscription and resource group.
4. Enter a globally unique name such as `trustbankevidence123`.
5. Select the same region.
6. Under `Performance`, choose `Standard`.
7. Under `Redundancy`, choose `Read-access geo-redundant storage (RA-GRS)` or `Read-access geo-zone-redundant storage (RA-GZRS)` if available in the region.
8. Click `Next: Advanced`.
9. Set `Allow enabling anonymous access on individual containers` to `Disabled`.
10. Ensure `Minimum TLS version` is `Version 1.2`.
11. Click `Next: Networking`.
12. Choose `Public endpoint (selected networks)` for a simpler demo or `Private endpoint` for a stricter network model.
13. If you choose selected networks, allow only the necessary networks and later add private endpoint for the final state.
14. Click `Review + create`.
15. Click `Create`.

## 5. Create Blob Containers

1. Open the storage account.
2. In the left navigation, click `Data storage` -> `Containers`.
3. Click `+ Container`.
4. Create:
   - `kyc-documents`
   - `transaction-receipts`
   - `audit-records`
   - `bank-statements`
   - `exports`
5. For each container, keep public access set to `Private (no anonymous access)`.

## 6. Enable Soft Delete, Versioning, and Change Feed

1. In the storage account menu, click `Data protection`.
2. Turn on `Blob soft delete`.
3. Set retention to a value such as `14` days.
4. Turn on `Container soft delete`.
5. Set retention to `14` days.
6. Turn on `Versioning for blobs`.
7. Turn on `Change feed`.
8. Click `Save`.

## 7. Configure Lifecycle Management

1. In the storage account menu, click `Lifecycle management`.
2. Click `Add a rule`.
3. Create a rule for receipts:
   - Name: `move-receipts-to-cool`
   - Scope: `Limit blobs with filters`
   - Blob type: `Block blobs`
   - Prefix match: `transaction-receipts/`
   - Base blobs: Move to cool after `30` days
4. Create a rule for audit records:
   - Name: `move-audits-to-archive`
   - Prefix match: `audit-records/`
   - Base blobs: Move to archive after `90` days
5. Create a rule for exports:
   - Name: `delete-old-exports`
   - Prefix match: `exports/`
   - Base blobs: Delete after `7` days
6. Save the rules.

## 8. Create Key Vault

1. Search for `Key vaults`.
2. Click `Create`.
3. Choose the same subscription, resource group, and region.
4. Enter a name like `kv-trustbank-demo`.
5. Keep RBAC permission model if your organization standard prefers it.
6. Click `Review + create`.
7. Click `Create`.
8. Open the Key Vault and add secrets for:
   - `DATABASE-URL`
   - `SESSION-SECRET`

## 9. Create Application Insights

1. Search for `Application Insights`.
2. Click `Create`.
3. Select the same resource group and region.
4. Choose `Workspace-based`.
5. Create or attach a Log Analytics workspace.
6. Finish deployment and copy the connection string later into App Service settings.

## 10. Create the App Service Plan and Web App

1. Search for `App Services`.
2. Click `Create`.
3. Choose `Web App`.
4. Set subscription and resource group.
5. Enter an app name like `app-trustbank-demo`.
6. Publish: `Code`.
7. Runtime stack: `Node 20 LTS`.
8. Operating system: `Linux` or `Windows`, as preferred for your team.
9. Region: same as the rest of the stack.
10. Create a new App Service plan or choose an existing one.
11. Select a plan size suitable for demo usage.
12. Enable `Application Insights` and select the instance you created.
13. Click `Review + create`.
14. Click `Create`.

## 11. Enable Managed Identity

1. Open the App Service resource.
2. In the left navigation, click `Identity`.
3. Under `System assigned`, switch `Status` to `On`.
4. Click `Save`.
5. Copy the `Object (principal) ID` after the save completes.

## 12. Assign RBAC on Storage

1. Open the storage account.
2. Click `Access control (IAM)`.
3. Click `Add` -> `Add role assignment`.
4. Search for `Storage Blob Data Contributor`.
5. Select the role and click `Next`.
6. Under `Assign access to`, choose `Managed identity`.
7. Select your App Service managed identity.
8. Click `Review + assign`.

## 13. Configure Networking

1. For App Service, open `Networking`.
2. Under `VNet Integration`, click `Add VNet`.
3. Select your VNet and the integration subnet.
4. For the storage account, create a private endpoint if you want a more locked-down demo:
   - Open storage account -> `Networking` -> `Private endpoint connections`
   - Click `+ Private endpoint`
   - Choose the blob subresource
   - Place it in the private endpoint subnet
5. Create the necessary `Private DNS Zone` integration when prompted.
6. Repeat the same approach for PostgreSQL Flexible Server if private access is part of the demo path.

## 14. Configure App Settings

1. In App Service, click `Environment variables`.
2. Add application settings matching `.env.example`.
3. Important values:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `APP_URL`
   - `APP_SERVICE_INSTANCE`
   - `AZURE_STORAGE_ACCOUNT_NAME`
   - `AZURE_STORAGE_ACCOUNT_URL`
   - `AZURE_STORAGE_USE_MANAGED_IDENTITY=true`
   - container names
   - `APPLICATIONINSIGHTS_CONNECTION_STRING`
4. Click `Apply`.

## 15. Deploy the App

1. In App Service, open `Deployment Center`.
2. Choose your source such as GitHub, Azure Repos, or ZIP deployment.
3. Point to this Next.js project.
4. Ensure your build command installs dependencies and runs `npm run build`.
5. Ensure startup runs `npm run start`.
6. Deploy.

## 16. Post-Deployment Validation

1. Browse to the application URL.
2. Register a customer or use the seeded account if you ran seed data.
3. Perform a deposit.
4. Confirm:
   - the balance changed
   - the `transactions` table has a record
   - `blob_documents` has two records
   - `audit_records` has one record
   - the receipt PDF exists in `transaction-receipts`
   - the JSON file exists in `audit-records`
5. Download the receipt through the app to confirm secure access works.
