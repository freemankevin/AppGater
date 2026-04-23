import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppGater - 官方工具聚合站",
  description: "聚合全球优质开发/办公工具，每日自动检测官方链接可用性，提供安全高速的下载代理服务",
  keywords: ["工具下载", "开发工具", "官方软件", "安全下载", "软件聚合"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
