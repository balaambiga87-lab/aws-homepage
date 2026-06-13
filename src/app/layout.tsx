import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "AWS Student Builders Group REC — Premium Cloud Portal",
  description: "Experience the next generation of cloud learning with AWS Student Builders Group at Rajalakshmi Engineering College. Explore our learning domains, dynamic cloud events, community milestones, and interactive resources.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
