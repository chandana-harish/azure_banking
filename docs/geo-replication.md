# Geo-Replication Demo Guide

## Goal

Show how Azure Storage replication protects banking evidence objects such as receipts and audit JSON records.

## Recommended Setup

- Storage redundancy: `RA-GRS` or `RA-GZRS`
- Primary write region: the region where App Service runs
- Secondary read region: Azure-managed paired region

## What You Can Demo Safely

- Evidence uploads go to the primary endpoint.
- Read-access is available from the secondary endpoint for replicated data.
- The storage account exposes primary and secondary endpoints in the portal.
- Replication is asynchronous, so there can be delay before objects appear in the secondary region.

## Demo Script

1. Upload a new receipt by performing a deposit.
2. Show the blob in the primary container.
3. Explain that Azure is asynchronously replicating it to the secondary region.
4. Open the storage account overview and point out the redundancy setting and secondary endpoint pattern.
5. Explain that `RPO` is not zero because replication is asynchronous.
6. Explain that `RTO` depends on failover operations and application readiness.

## What You Usually Cannot Fully Prove in a Lightweight Demo

- True production failover behavior without executing an actual account failover.
- Exact replication lag at every moment.
- PostgreSQL regional failover unless that service is separately configured for HA or DR.

## How to Explain Failover

- App writes stop going to the original primary if the storage account is failed over.
- Secondary becomes the new primary after account failover.
- Some very recent writes may be missing if they had not yet replicated.
- Application configuration and operational runbooks must account for this.
