export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist p-6">
      <div className="rounded-[32px] bg-white p-10 text-center shadow-panel">
        <h1 className="font-display text-4xl text-ink">Page not found</h1>
        <p className="mt-3 text-sm text-slate">The requested route is unavailable in this banking demo.</p>
      </div>
    </div>
  );
}
