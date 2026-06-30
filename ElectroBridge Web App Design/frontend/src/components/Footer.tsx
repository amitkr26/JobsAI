import Link from 'next/link';
import { CircuitBoard } from 'lucide-react';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Opportunities', href: '/opportunities' },
      { label: 'News', href: '/news' },
      { label: 'AI Assistant', href: '/chat' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resume Builder', href: '/resume' },
      { label: 'GATE Prep', href: '/resources' },
      { label: 'Interview Tips', href: '/resources' },
      { label: 'Salary Guide', href: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1F2937] py-10 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CircuitBoard size={16} className="text-[#00E5FF]" />
              <span className="font-bold text-white text-sm">
                Electro<span className="text-[#00E5FF]">Bridge</span>
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              AI-powered career platform for the semiconductor and electronics engineering community.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#94A3B8] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1F2937] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#94A3B8]">© 2025 ElectroBridge. All rights reserved.</p>
          <p className="text-xs text-[#94A3B8]">Built for India&apos;s semiconductor revolution</p>
        </div>
      </div>
    </footer>
  );
}
