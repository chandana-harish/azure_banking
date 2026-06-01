"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-mist p-6">
        <div className="max-w-lg rounded-[32px] bg-white p-10 shadow-panel">
          <h1 className="font-display text-3xl text-ink">System error</h1>
          <p className="mt-3 text-sm text-slate">{error.message}</p>
          <button onClick={() => reset()} className="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
