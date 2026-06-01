import { UserRole } from "@prisma/client";
import { ActionButton, Card, PageTitle, StatCard } from "@/components/ui";
import { getDashboardData, getCustomerAccount } from "@/lib/banking";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { requireSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await requireSession();
  const data = await getDashboardData(session.sub, session.role);

  if (session.role === UserRole.ADMIN) {
    const adminData = data as Awaited<ReturnType<typeof getDashboardData>>;

    return (
      <div>
        <PageTitle
          title="Admin Oversight Dashboard"
          subtitle="Monitor transaction activity, evidence counts, and audit-readiness across the banking demo estate."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Customers" value={String((adminData as any).customerCount)} />
          <StatCard label="Transactions" value={String((adminData as any).transactionCount)} accent="pine" />
          <StatCard label="Blob Documents" value={String((adminData as any).documentCount)} accent="rose" />
        </div>
        <Card className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate">
                <tr>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {(adminData as any).recentTransactions.map((row: any) => (
                  <tr key={row.id} className="border-t border-ink/8">
                    <td className="py-3">{row.customer.fullName}</td>
                    <td className="py-3">{row.type}</td>
                    <td className="py-3">{formatCurrency(row.amount)}</td>
                    <td className="py-3">{formatDateTime(row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  const customer = await getCustomerAccount(session.sub);
  const customerData = data as any;

  return (
    <div>
      <PageTitle
        title={`Welcome back, ${customer.customer.fullName.split(" ")[0]}`}
        subtitle="Review balances, process transactions, and inspect the Azure-backed receipt and audit trail for every account movement."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Available Balance" value={formatCurrency(customer.account.availableBalance)} />
        <StatCard label="Account Number" value={customer.account.accountNumber} accent="pine" />
        <StatCard label="Evidence Records" value={String(customerData.blobDocs.length)} accent="rose" />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">Recent Transactions</h2>
            <ActionButton href="/transactions" label="Full history" tone="secondary" />
          </div>
          <div className="space-y-3">
            {customerData.transactions.map((row: any) => (
              <div key={row.id} className="rounded-2xl border border-ink/8 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{row.type}</p>
                    <p className="text-sm text-slate">{formatDateTime(row.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ink">{formatCurrency(row.amount)}</p>
                    <p className="text-sm text-slate">{row.reference}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-ink">Quick Actions</h2>
          <p className="mt-2 text-sm text-slate">Every deposit or withdrawal writes to PostgreSQL, then creates a private PDF receipt and JSON audit object in Blob Storage.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton href="/deposit" label="Deposit Funds" />
            <ActionButton href="/withdraw" label="Withdraw Funds" tone="secondary" />
            <ActionButton href="/evidence" label="View Evidence" tone="secondary" />
          </div>
        </Card>
      </div>
    </div>
  );
}
