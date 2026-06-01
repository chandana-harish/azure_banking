import Link from "next/link";
import { DocumentType } from "@prisma/client";
import { Card, PageTitle } from "@/components/ui";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

export default async function EvidencePage() {
  const session = await requireSession();
  const docs = await prisma.blobDocument.findMany({
    where: {
      customer: {
        userId: session.sub
      }
    },
    orderBy: { uploadedAt: "desc" },
    include: {
      transaction: true
    }
  });

  return (
    <div>
      <PageTitle
        title="Receipts & Evidence"
        subtitle="Blob evidence stays private. Downloads are mediated by the application, which issues short-lived read access for a specific document."
      />
      <Card>
        <div className="space-y-4">
          {docs.map((doc) => (
            <div key={doc.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-ink/8 p-4 lg:flex-row lg:items-center">
              <div>
                <p className="font-semibold text-ink">{doc.documentType === DocumentType.RECEIPT_PDF ? "Receipt PDF" : "Audit JSON"}</p>
                <p className="text-sm text-slate">{doc.blobPath}</p>
                <p className="mt-1 text-xs text-slate">
                  {doc.transaction?.reference ?? "No reference"} • Uploaded {formatDateTime(doc.uploadedAt)}
                </p>
              </div>
              <Link href={`/api/documents/${doc.id}/download`} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                Secure Download
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
