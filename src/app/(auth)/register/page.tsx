import Link from "next/link";

export default function RegisterPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  return (
    <div className="min-h-screen bg-mist px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-[36px] bg-white p-10 shadow-panel">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Customer Onboarding</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Open a demo account</h1>
        <p className="mt-3 text-sm text-slate">
          Registration creates a customer profile, a primary account, and a session in the same monolithic application.
        </p>
        {searchParams?.error ? (
          <p className="mt-4 rounded-2xl bg-rose/10 px-4 py-3 text-sm text-rose">{decodeURIComponent(searchParams.error)}</p>
        ) : null}
        <form action="/api/auth/register" method="post" className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Full name</label>
            <input name="fullName" required className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input name="email" type="email" required className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input name="phone" className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input name="password" type="password" required className="w-full rounded-2xl border border-ink/10 px-4 py-3" />
          </div>
          <button className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Create account</button>
        </form>
        <p className="mt-6 text-sm text-slate">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-gold">
            Return to login
          </Link>
        </p>
      </div>
    </div>
  );
}
