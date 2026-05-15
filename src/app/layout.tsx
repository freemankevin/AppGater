import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import { I18nProvider } from '@/components/I18nProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axis',
  description: 'Discover, rate and download quality software safely, cleanly, ad-free',
  keywords: ['software market', 'official download', 'dev tools', 'office tools', 'safe download'],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen antialiased">
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
