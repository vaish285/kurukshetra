import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Chakra — AI Creator OS",
  description: "Transform any idea into publish-ready content. AI-powered scripts, smart scheduling, analytics insights, and virality prediction — all in one dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
