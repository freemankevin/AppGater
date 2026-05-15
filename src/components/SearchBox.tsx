'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

export default function SearchBox({
  onSearch,
  placeholder = 'Search tools...',
  className = '',
  inputClassName = '',
}: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all ${inputClassName}`}
      />
    </div>
  );
}
