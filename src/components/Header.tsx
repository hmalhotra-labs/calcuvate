'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-sm text-gray-700 uppercase tracking-wider">
          About
        </Link>

        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="w-6 h-6 bg-[#b24f3b] rounded-full"></div>
          </Link>
        </div>

        <Link href="/" className="text-sm text-gray-700 uppercase tracking-wider">
          Shop
        </Link>
      </div>
    </header>
  );
}

export default Header;
