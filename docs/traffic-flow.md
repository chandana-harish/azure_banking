# Traffic Flow Guide

## End-to-End Request Path

### Login and Dashboard

1. User opens the App Service URL over HTTPS.
2. Next.js serves the login page.
3. User submits credentials to `/api/auth/login`.
4. The route verifies the password against PostgreSQL data.
5. The app issues an HTTP-only session cookie.
6. The dashboard page reads session data and queries PostgreSQL for balances and recent transactions.

### Deposit or Withdrawal

1. User submits deposit or withdrawal from the dashboard experience.
2. The browser sends the request to the monolithic Next.js API route in App Service.
3. The route validates the session and payload.
4. The banking service opens a PostgreSQL transaction.
5. The account balance and transaction ledger are updated in PostgreSQL.
6. The app generates a receipt PDF in memory.
7. The app generates an audit JSON object in memory.
8. App Service authenticates to Blob Storage using Managed Identity.
9. The receipt uploads to `transaction-receipts`.
10. The audit file uploads to `audit-records`.
11. Blob path, URL, checksum, metadata, and version IDs are written back to PostgreSQL.
12. The API returns success to the browser.

### Secure Evidence Download

1. User clicks the download button in the evidence page.
2. The app checks the document ownership or admin role in PostgreSQL.
3. The app creates a short-lived read URL for the exact blob.
4. The browser is redirected to that read URL.
5. The blob is downloaded without making the container public.

## Azure Network Flow Summary

- User -> App Service -> PostgreSQL Flexible Server
- User -> App Service -> Blob Storage
- App Service -> Key Vault
- App Service -> Application Insights

## Private Networking Target State

- App Service uses VNet integration.
- PostgreSQL Flexible Server uses private access.
- Storage Blob service uses private endpoint.
- Private DNS Zones resolve database and blob endpoints inside the VNet.
