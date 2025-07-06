import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "MBST Store",
  description:
    "Functional app built for Zara challenge, using SSR and fully ready for SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
