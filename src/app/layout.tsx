import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrustBank Evidence Storage System",
  description: "Demo banking app showcasing Azure Blob Storage evidence workflows."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
