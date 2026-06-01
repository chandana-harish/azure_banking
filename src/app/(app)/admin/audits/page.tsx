import { Card, PageTitle } from "@/components/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

export default async function AdminAuditsPage() {
  await requireAdmin();
  const audits = await prisma.auditRecord.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      customer: true,
      transaction: true
    }
  });

  return (
    <div>
      <PageTitle
        title="Admin Audit Records"
        subtitle="Operational and compliance visibility into JSON audit evidence stored in Blob Storage and indexed back into PostgreSQL."
      />
      <Card>
        <div className="space-y-4">
          {audits.map((audit) => (
            <div key={audit.id} className="rounded-2xl border border-ink/8 p-4">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-semibold text-ink">{audit.eventType}</p>
                  <p className="text-sm text-slate">{audit.customer.fullName} • {audit.transaction?.reference ?? "No reference"}</p>
                </div>
                <p className="text-sm text-slate">{formatDateTime(audit.createdAt)}</p>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-mist p-4 text-xs text-ink">
                {JSON.stringify(audit.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
