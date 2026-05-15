import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold tracking-tight mb-4">404</h1>
        <p className="text-gray-500 text-lg mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
