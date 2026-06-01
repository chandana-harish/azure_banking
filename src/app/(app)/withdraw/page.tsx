import { TransactionForm } from "@/components/form";
import { Card, PageTitle } from "@/components/ui";

export default function WithdrawPage() {
  return (
    <div>
      <PageTitle
        title="Withdraw Funds"
        subtitle="Withdrawals enforce balance checks first, then persist the transaction, audit JSON, and receipt artifact with secure private blob access."
      />
      <Card className="max-w-xl">
        <TransactionForm endpoint="/api/transactions/withdraw" title="Withdrawal" buttonLabel="Complete Withdrawal" />
      </Card>
    </div>
  );
}
