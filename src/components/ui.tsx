import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <h1 className="font-display text-4xl text-ink">{title}</h1>
      <p className="max-w-3xl text-sm text-slate">{subtitle}</p>
    </div>
  );
}

export function Card({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return <section className={cn("rounded-3xl bg-white p-6 shadow-panel", className)}>{children}</section>;
}

export function StatCard({
  label,
  value,
  accent = "gold"
}: {
  label: string;
  value: string;
  accent?: "gold" | "pine" | "rose";
}) {
  const accentMap = {
    gold: "bg-gold/10 text-gold",
    pine: "bg-pine/10 text-pine",
    rose: "bg-rose/10 text-rose"
  };

  return (
    <Card>
      <div className={cn("mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold", accentMap[accent])}>
        {label}
      </div>
      <p className="text-3xl font-semibold text-ink">{value}</p>
    </Card>
  );
}

export function ActionButton({
  href,
  label,
  tone = "primary"
}: {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex rounded-full px-5 py-3 text-sm font-semibold transition",
        tone === "primary"
          ? "bg-ink text-white hover:bg-ink/90"
          : "border border-ink/15 bg-white text-ink hover:border-gold hover:text-gold"
      )}
    >
      {label}
    </Link>
  );
}
