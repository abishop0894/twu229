import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageLayout } from "./modules/layout/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TWU Local 229",
  description: "Transport Workers Union Local 229 - We Move Hudson County",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageLayout>
          {children}
        </PageLayout>
      </body>
    </html>
  );
}
