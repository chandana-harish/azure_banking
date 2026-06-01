type AuditPayload = {
  transactionId: string;
  customerId: string;
  accountId: string;
  transactionType: "DEPOSIT" | "WITHDRAWAL";
  amount: number;
  oldBalance: number;
  newBalance: number;
  timestamp: string;
  appServiceInstance: string;
  requestId: string;
  blobUploadStatus: string;
  metadata: Record<string, string>;
};

export function buildAuditRecord(payload: AuditPayload) {
  return Buffer.from(JSON.stringify(payload, null, 2), "utf-8");
}
