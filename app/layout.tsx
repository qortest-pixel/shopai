import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopAI - 상품 설명 자동 생성",
  description: "AI가 팔리는 상품 설명을 자동으로 만들어드립니다. 스마트스토어, 쿠팡, 11번가 지원.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">🛒</span>
                <span className="text-xl font-bold text-gray-900">Shop<span className="text-amber-500">AI</span></span>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-gray-600 hover:text-amber-500 transition-colors text-sm font-medium">홈</Link>
                <Link href="/generate" className="text-gray-600 hover:text-amber-500 transition-colors text-sm font-medium">상품 설명 생성</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-amber-500 transition-colors text-sm font-medium">가격</Link>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/generate"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  무료로 시작
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🛒</span>
                  <span className="text-xl font-bold text-white">Shop<span className="text-amber-500">AI</span></span>
                </div>
                <p className="text-sm leading-relaxed max-w-md">
                  AI가 팔리는 상품 설명을 자동으로 만들어드립니다.
                  스마트스토어, 쿠팡, 11번가 판매자를 위한 최고의 도구.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">서비스</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/generate" className="hover:text-amber-400 transition-colors">상품 설명 생성</Link></li>
                  <li><Link href="/pricing" className="hover:text-amber-400 transition-colors">가격 안내</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">지원 플랫폼</h4>
                <ul className="space-y-2 text-sm">
                  <li>네이버 스마트스토어</li>
                  <li>쿠팡</li>
                  <li>11번가</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
              © 2026 ShopAI. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
