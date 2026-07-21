import type { Metadata } from "next";
import { Noto_Sans_KR, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bs-sign.com"),
  title: "백송사인 | 고무스카시·아크릴·포맥스·LED 네온 제작",
  description:
    "광고사와 간판업체를 위한 사인물 제작·가공 전문업체 백송사인. 고무스카시, 아크릴 가공, 포맥스 가공, 포맥스 돔보, LED 네온 제작과 전국 출고를 지원합니다.",
  verification: {
    other: {
      "naver-site-verification": "61e23bc9e7db05b1ff1d694a7e1ec42809c72082",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
