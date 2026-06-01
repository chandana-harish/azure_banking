import { AppShell } from "@/components/shell";
import { requireSession } from "@/lib/auth";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  return (
    <AppShell email={session.email} role={session.role}>
      {children}
    </AppShell>
  );
}
