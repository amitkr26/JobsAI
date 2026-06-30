'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Briefcase, Newspaper, Bot, Users, FileText,
  Bell, User, CircuitBoard, Menu, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: <Home size={15} /> },
  { label: 'Opportunities', href: '/opportunities', icon: <Briefcase size={15} /> },
  { label: 'News', href: '/news', icon: <Newspaper size={15} /> },
  { label: 'AI Assistant', href: '/chat', icon: <Bot size={15} /> },
  { label: 'Community', href: '/community', icon: <Users size={15} /> },
  { label: 'Resume', href: '/resume', icon: <FileText size={15} /> },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[#0B1120]/90 backdrop-blur-xl border-b border-[#1F2937]">
      <div className="max-w-[1440px] mx-auto px-4 h-full flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center">
            <CircuitBoard size={14} className="text-[#00E5FF]" />
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight">
            Electro<span className="text-[#00E5FF]">Bridge</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#00E5FF]/10 text-[#00E5FF]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1A2438]',
                )}
              >
                {item.icon}{item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button className="hidden md:flex p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1A2438] transition-colors">
            <Bell size={16} />
          </button>
          <Link
            href="/dashboard"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1A2438] border border-[#1F2937] text-sm text-white hover:border-[#00E5FF]/30 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-[#00E5FF]/20 flex items-center justify-center">
              <User size={11} className="text-[#00E5FF]" />
            </div>
            Dashboard
          </Link>
          <Link
            href="/admin"
            className="hidden md:flex px-3 py-1.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-sm text-[#00E5FF] font-medium hover:bg-[#00E5FF]/15 transition-colors"
          >
            Admin
          </Link>
          <button
            className="md:hidden p-2 text-[#94A3B8]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#111827] border-b border-[#1F2937] px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium',
                  isActive ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 'text-[#94A3B8]',
                )}
              >
                {item.icon}{item.label}
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8]"
          >
            <User size={15} />Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
