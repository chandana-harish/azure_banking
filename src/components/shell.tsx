import Link from "next/link";
import { ReactNode } from "react";
import { UserRole } from "@prisma/client";

const customerLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/account", label: "Account Summary" },
  { href: "/deposit", label: "Deposit" },
  { href: "/withdraw", label: "Withdraw" },
  { href: "/transactions", label: "Transactions" },
  { href: "/evidence", label: "Receipts & Evidence" },
  { href: "/blob-demo", label: "Blob Storage Demo" },
  { href: "/architecture", label: "Architecture" }
];

const adminLinks = [
  { href: "/dashboard", label: "Admin Dashboard" },
  { href: "/admin/audits", label: "Audit Records" },
  { href: "/blob-demo", label: "Blob Storage Demo" },
  { href: "/architecture", label: "Architecture" }
];

export function AppShell({
  children,
  email,
  role
}: {
  children: ReactNode;
  email: string;
  role: UserRole;
}) {
  const links = role === UserRole.ADMIN ? adminLinks : customerLinks;

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[32px] bg-ink p-6 text-white shadow-panel">
          <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="font-display text-2xl">TrustBank</p>
            <p className="mt-2 text-sm text-white/70">Evidence Storage System</p>
          </div>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm text-white/85 hover:bg-white/10">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10 rounded-3xl border border-gold/30 bg-gold/10 p-4 text-sm text-white/90">
            <p className="font-semibold">Signed in</p>
            <p className="mt-1 break-all text-white/70">{email}</p>
            <form action="/api/auth/logout" method="post" className="mt-4">
              <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink">Logout</button>
            </form>
          </div>
        </aside>
        <main className="rounded-[32px] bg-white/70 p-6 backdrop-blur-sm">{children}</main>
      </div>
    </div>
  );
}
