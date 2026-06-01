import { TransactionForm } from "@/components/form";
import { Card, PageTitle } from "@/components/ui";

export default function DepositPage() {
  return (
    <div>
      <PageTitle
        title="Deposit Funds"
        subtitle="Deposits update the account balance in PostgreSQL and generate both a receipt PDF and a JSON audit record in Azure Blob Storage."
      />
      <Card className="max-w-xl">
        <TransactionForm endpoint="/api/transactions/deposit" title="Deposit" buttonLabel="Complete Deposit" />
      </Card>
    </div>
  );
}
