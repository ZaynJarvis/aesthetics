import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual atlas of design styles, aesthetics, and image-generation prompts.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Gallery",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Detect in-app browsers (Twitter/X) that already offset the WebView
            below the device safe area — suppress our own safe-top padding there */}
        <script dangerouslySetInnerHTML={{ __html:
          `if(/Twitter/i.test(navigator.userAgent))document.documentElement.setAttribute('data-in-app','1');`
        }} />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
