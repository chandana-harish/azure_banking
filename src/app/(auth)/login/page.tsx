import Link from "next/link";

export default function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  return (
    <div className="min-h-screen bg-ledger px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[36px] border border-white/10 bg-white/8 p-10 text-white backdrop-blur">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-gold">Secure Banking Demo</p>
          <h1 className="font-display text-5xl leading-tight">Trust-forward banking with verifiable transaction evidence.</h1>
          <p className="mt-6 max-w-2xl text-white/80">
            This monolithic Next.js application demonstrates customer banking flows, PostgreSQL as the system of record,
            and Azure Blob Storage for secure receipts and audit JSON evidence.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/8 p-4">
              <p className="text-sm text-white/70">Storage</p>
              <p className="mt-2 font-semibold">Private blobs, versioning, soft delete</p>
            </div>
            <div className="rounded-3xl bg-white/8 p-4">
              <p className="text-sm text-white/70">Database</p>
              <p className="mt-2 font-semibold">PostgreSQL Flexible Server system of record</p>
            </div>
            <div className="rounded-3xl bg-white/8 p-4">
              <p className="text-sm text-white/70">Resilience</p>
              <p className="mt-2 font-semibold">RA-GRS / RA-GZRS demo guidance</p>
            </div>
          </div>
        </section>
        <section className="rounded-[36px] bg-white p-10 shadow-panel">
          <h2 className="font-display text-3xl text-ink">Login</h2>
          <p className="mt-2 text-sm text-slate">Use seeded credentials or register a new customer account.</p>
          {searchParams?.error ? (
            <p className="mt-4 rounded-2xl bg-rose/10 px-4 py-3 text-sm text-rose">{decodeURIComponent(searchParams.error)}</p>
          ) : null}
          <form action="/api/auth/login" method="post" className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-ink">Email</label>
              <input name="email" type="email" required className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-ink">Password</label>
              <input name="password" type="password" required className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
            </div>
            <button className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Login</button>
          </form>
          <div className="mt-6 rounded-3xl bg-mist p-4 text-sm text-slate">
            <p>
              Seeded customer: <code>customer@trustbank.demo</code> / <code>Customer123!</code>
            </p>
            <p>
              Seeded admin: <code>admin@trustbank.demo</code> / <code>Admin12345!</code>
            </p>
          </div>
          <p className="mt-6 text-sm text-slate">
            Need an account?{" "}
            <Link href="/register" className="font-semibold text-gold">
              Register customer
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
