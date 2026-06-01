# Troubleshooting Guide

## App cannot connect to PostgreSQL

- Verify `DATABASE_URL` is correct and includes `sslmode=require`.
- Check PostgreSQL networking, firewall rules, or private DNS resolution.
- Confirm the database schema was deployed with Prisma.

## Blob upload fails with authentication error

- Confirm App Service managed identity is enabled.
- Confirm the identity has `Storage Blob Data Contributor` on the storage account.
- Verify `AZURE_STORAGE_ACCOUNT_URL` and `AZURE_STORAGE_ACCOUNT_NAME`.
- If using local development, sign in with `az login` or temporarily use a connection string for local testing.

## Receipt download fails

- Ensure the blob exists in the expected container and path.
- Check that SAS generation is allowed through Managed Identity or fallback connection string mode.
- Verify the document record in PostgreSQL matches the blob path.

## Transactions fail on withdrawal

- Confirm the account has sufficient available balance.
- Check for any malformed numeric input.

## Deployment succeeds but app errors at runtime

- Verify App Service environment variables were saved and the app restarted.
- Check Application Insights and App Service log stream for stack traces.
- Confirm `npm run build` and `npm run start` are the configured commands.
