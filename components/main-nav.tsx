'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { href: '/#features', label: 'Features' },
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Documentation' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="relative z-50">
      {/* Mobile menu toggle button */}
      <div className="flex items-center md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Desktop nav links */}
      <ul className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile nav dropdown */}
      <div
        className={cn(
          "absolute left-0 right-0 top-14 mx-auto w-[95%] max-w-sm rounded-lg border border-primary/10 bg-background/90 backdrop-blur-xl shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <ul className="flex flex-col divide-y divide-muted-foreground/10">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className="block px-6 py-4 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
