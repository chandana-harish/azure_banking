import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(16),
  APP_URL: z.string().url(),
  APP_SERVICE_INSTANCE: z.string().default("local-dev"),
  APP_ENVIRONMENT: z.string().default("development"),
  AZURE_STORAGE_ACCOUNT_NAME: z.string().min(1),
  AZURE_STORAGE_ACCOUNT_URL: z.string().url(),
  AZURE_STORAGE_USE_MANAGED_IDENTITY: z.string().default("true"),
  AZURE_STORAGE_CONNECTION_STRING: z.string().optional(),
  AZURE_STORAGE_CONTAINER_KYC: z.string().default("kyc-documents"),
  AZURE_STORAGE_CONTAINER_RECEIPTS: z.string().default("transaction-receipts"),
  AZURE_STORAGE_CONTAINER_AUDITS: z.string().default("audit-records"),
  AZURE_STORAGE_CONTAINER_STATEMENTS: z.string().default("bank-statements"),
  AZURE_STORAGE_CONTAINER_EXPORTS: z.string().default("exports"),
  AZURE_KEY_VAULT_URL: z.string().optional(),
  APPLICATIONINSIGHTS_CONNECTION_STRING: z.string().optional()
});

export const env = envSchema.parse(process.env);
