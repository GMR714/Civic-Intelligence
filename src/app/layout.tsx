import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { ConnectWalletModal } from "@/components/ConnectWalletModal";
import { OnboardingWizard } from "@/components/OnboardingWizard";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ipê Civic Intelligence Platform",
  description: "Data-driven community consensus and governance — Florianópolis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} dark antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <ConnectWalletModal />
        <OnboardingWizard />
        <main className="flex-1 flex flex-col pt-6 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
