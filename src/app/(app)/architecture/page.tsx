import { Card, PageTitle } from "@/components/ui";

export default function ArchitecturePage() {
  return (
    <div>
      <PageTitle
        title="System Architecture"
        subtitle="A concise explanation of the target Azure topology, network flow, and security approach used by this project."
      />
      <div className="grid gap-4">
        <Card>
          <h2 className="mb-3 text-xl font-semibold">Primary Flow</h2>
          <div className="space-y-2 text-sm text-slate">
            <p>User {"->"} Azure App Service {"->"} Next.js route handler {"->"} PostgreSQL Flexible Server</p>
            <p>User {"->"} Azure App Service {"->"} Next.js route handler {"->"} Azure Blob Storage</p>
            <p>App Service uses Managed Identity and RBAC to upload receipts and audit JSON without public blob access.</p>
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 text-xl font-semibold">Recommended Azure Services</h2>
          <div className="grid gap-3 text-sm text-slate md:grid-cols-2">
            <p>App Service with system-assigned managed identity</p>
            <p>PostgreSQL Flexible Server in private access mode</p>
            <p>Storage Account with RA-GRS or RA-GZRS</p>
            <p>Private Endpoints and Private DNS Zones</p>
            <p>Key Vault for database and operational secrets</p>
            <p>Application Insights and Log Analytics for observability</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
