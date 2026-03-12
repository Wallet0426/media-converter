import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media-Converter - YouTube & Twitch to MP3/MP4 Converter",
  description: "YouTube, Twitch VOD 영상을 MP3, MP4로 빠르게 변환하세요. 무료, 빠르고 안전합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
