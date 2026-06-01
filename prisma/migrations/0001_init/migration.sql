CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'ADMIN');
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');
CREATE TYPE "DocumentType" AS ENUM ('RECEIPT_PDF', 'AUDIT_JSON', 'STATEMENT', 'KYC');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Customer" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "customerNo" TEXT NOT NULL,
  "phone" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "accountNumber" TEXT NOT NULL,
  "accountType" TEXT NOT NULL DEFAULT 'Checking',
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "availableBalance" DECIMAL(18,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Transaction" (
  "id" TEXT NOT NULL,
  "accountId" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "type" "TransactionType" NOT NULL,
  "amount" DECIMAL(18,2) NOT NULL,
  "balanceBefore" DECIMAL(18,2) NOT NULL,
  "balanceAfter" DECIMAL(18,2) NOT NULL,
  "description" TEXT,
  "reference" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BlobDocument" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "accountId" TEXT NOT NULL,
  "transactionId" TEXT,
  "documentType" "DocumentType" NOT NULL,
  "containerName" TEXT NOT NULL,
  "blobPath" TEXT NOT NULL,
  "blobUrl" TEXT NOT NULL,
  "versionId" TEXT,
  "checksum" TEXT,
  "metadata" JSONB NOT NULL,
  "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "BlobDocument_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditRecord" (
  "id" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "accountId" TEXT NOT NULL,
  "transactionId" TEXT,
  "containerName" TEXT NOT NULL,
  "blobPath" TEXT NOT NULL,
  "blobUrl" TEXT NOT NULL,
  "versionId" TEXT,
  "eventType" TEXT NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditRecord_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");
CREATE UNIQUE INDEX "Customer_customerNo_key" ON "Customer"("customerNo");
CREATE UNIQUE INDEX "Account_accountNumber_key" ON "Account"("accountNumber");
CREATE UNIQUE INDEX "Transaction_reference_key" ON "Transaction"("reference");

ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Account" ADD CONSTRAINT "Account_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BlobDocument" ADD CONSTRAINT "BlobDocument_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BlobDocument" ADD CONSTRAINT "BlobDocument_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "BlobDocument" ADD CONSTRAINT "BlobDocument_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditRecord" ADD CONSTRAINT "AuditRecord_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditRecord" ADD CONSTRAINT "AuditRecord_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditRecord" ADD CONSTRAINT "AuditRecord_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
