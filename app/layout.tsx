import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeMatch — Find your trade. Start your career.",
  description:
    "TradeMatch connects motivated students with trade schools looking for their next class of electricians, plumbers, welders, and carpenters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
