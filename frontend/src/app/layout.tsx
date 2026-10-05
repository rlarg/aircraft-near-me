import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Find aircraft near you – Aircraft near me",
  description: "Find aircraft flying near a UK postcode. A prototype using sample aircraft data.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* Load the vendor CSS unchanged: its legacy browser rules cannot be parsed by Turbopack. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/govuk/govuk-frontend.min.css" />
      </head>
      <body className="govuk-template__body aircraft-site">
        <a href="#main-content" className="govuk-skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
