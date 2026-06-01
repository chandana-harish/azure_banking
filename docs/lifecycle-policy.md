# Lifecycle Policy Guide

## Recommended Rules

- `transaction-receipts/`: move to Cool after 30 days
- `audit-records/`: move to Archive after 90 days if compliance allows
- `exports/`: delete after 7 days
- `bank-statements/`: retain longer according to policy, optionally move to Cool after 60 days

## Why It Helps

- Reduces storage cost for older evidence
- Preserves important banking records with controlled retention
- Keeps temporary operational data from accumulating indefinitely
- Supports compliance-oriented storage classes without changing application code

## Demo Pattern

1. Show a newly uploaded receipt in Hot tier.
2. Open lifecycle rules in the portal.
3. Explain when Azure will transition older blobs to a cheaper tier.
4. Explain why exports are deleted earlier than core receipts and audits.
