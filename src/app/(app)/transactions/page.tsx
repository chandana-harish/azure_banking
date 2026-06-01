import { Card, PageTitle } from "@/components/ui";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default async function TransactionsPage() {
  const session = await requireSession();
  const transactions = await prisma.transaction.findMany({
    where: {
      customer: {
        userId: session.sub
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <PageTitle
        title="Transaction History"
        subtitle="A structured ledger view of deposits and withdrawals stored in PostgreSQL, with references that link back to Blob evidence records."
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate">
              <tr>
                <th className="pb-4">Reference</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Before</th>
                <th className="pb-4">After</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-ink/8">
                  <td className="py-4">{tx.reference}</td>
                  <td className="py-4">{tx.type}</td>
                  <td className="py-4">{formatCurrency(tx.amount)}</td>
                  <td className="py-4">{formatCurrency(tx.balanceBefore)}</td>
                  <td className="py-4">{formatCurrency(tx.balanceAfter)}</td>
                  <td className="py-4">{formatDateTime(tx.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
