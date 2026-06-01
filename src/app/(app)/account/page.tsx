import { Card, PageTitle } from "@/components/ui";
import { getCustomerAccount } from "@/lib/banking";
import { requireSession } from "@/lib/auth";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export default async function AccountPage() {
  const session = await requireSession();
  const { customer, account } = await getCustomerAccount(session.sub);

  return (
    <div>
      <PageTitle title="Account Summary" subtitle="Customer and account details from PostgreSQL Flexible Server, which serves as the banking system of record." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Customer Profile</h2>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Name:</span> {customer.fullName}</p>
            <p><span className="font-semibold">Customer No:</span> {customer.customerNo}</p>
            <p><span className="font-semibold">Phone:</span> {customer.phone ?? "Not provided"}</p>
            <p><span className="font-semibold">Created:</span> {formatDateTime(customer.createdAt)}</p>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-semibold">Account Details</h2>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Account:</span> {account.accountNumber}</p>
            <p><span className="font-semibold">Type:</span> {account.accountType}</p>
            <p><span className="font-semibold">Currency:</span> {account.currency}</p>
            <p><span className="font-semibold">Available Balance:</span> {formatCurrency(account.availableBalance, account.currency)}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
