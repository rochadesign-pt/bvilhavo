import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EmergencyBar } from "@/components/emergency-bar";
import { SmoothScroll } from "@/components/smooth-scroll";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bvilhavo.pt"),
  title: {
    default: "Bombeiros Voluntários de Ílhavo",
    template: "%s · Bombeiros Voluntários de Ílhavo",
  },
  description:
    "Ao serviço da comunidade de Ílhavo desde 1893. Socorro, prevenção e proximidade — uma associação humanitária de bombeiros voluntários.",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Bombeiros Voluntários de Ílhavo",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={`${sans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-surface text-text">
        <SmoothScroll />
        <EmergencyBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
