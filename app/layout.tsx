import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import TanstackReactQueryProvider from "@/providers/tanstack-react-query";
import { AuthWrapper } from "@/components/auth-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { SettingsProvider } from "@/providers/settings";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchCommand } from "@/components/search-command";

const DATA = {
  name: "OS",
  description: "Web-based Operating System Simulator",
  url: "http://os.anuragkochar.com/",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <TanstackReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              <AuthWrapper>
                <SettingsProvider>
                  {children}
                  <SearchCommand />
                </SettingsProvider>
              </AuthWrapper>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
          {/* {process.env.NODE_ENV !== "production" && (
            <Script src="https://unpkg.com/react-scan/dist/auto.global.js"></Script>
          )} */}
        </TanstackReactQueryProvider>
      </body>
    </html>
  );
}
