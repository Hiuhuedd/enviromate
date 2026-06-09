'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '#',
    children: [
      { label: 'Construction', href: '/construction' },
      { label: 'Consultancy', href: '/consultancy?tab=consultancy' },
      { label: 'Training', href: '/consultancy?tab=training' },
      { label: 'Surveys', href: '/consultancy?tab=surveys' },
      { label: 'Fire Extinguishers', href: '/consultancy?tab=fire_extinguishers' },
      { label: 'Supply of PPEs', href: '/consultancy?tab=ppe_supply' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white shadow-md border-b border-[rgba(93,174,62,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo-icon.png" alt="Enviromate Logo" fill sizes="40px" className="object-contain" />
          </div>
          <div className="hidden sm:block">
            <p className={`font-bold text-sm leading-tight tracking-wide transition-colors ${
              scrolled ? 'text-[#181b1d]' : 'text-white'
            }`}>
              ENVIROMATE
            </p>
            <p className="text-[#5dae3e] text-xs tracking-[0.15em] font-medium">TECHNOLOGIES LTD</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className={`nav-link flex items-center gap-1 transition-colors text-sm font-medium py-2 ${
                    scrolled
                      ? 'text-[#475355] hover:text-[#181b1d]'
                      : 'text-gray-200 hover:text-white'
                  }`}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <div className="bg-white rounded-lg overflow-hidden min-w-[180px] shadow-xl border border-[rgba(93,174,62,0.15)]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-5 py-3 text-sm text-[#475355] hover:text-[#181b1d] hover:bg-[#f5faf2] transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5dae3e]" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-medium py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-[#5dae3e] active'
                    : scrolled
                    ? 'text-[#475355] hover:text-[#181b1d]'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${
            scrolled || mobileOpen ? 'text-[#181b1d]' : 'text-white'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-y-auto ${
          mobileOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-b border-[rgba(93,174,62,0.15)] shadow-lg`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p className="text-[#869399] text-xs font-semibold tracking-widest uppercase px-3 py-2 mt-2">
                  Services
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center gap-2 px-3 py-2.5 text-[#475355] hover:text-[#181b1d] text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5dae3e]" />
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#5dae3e] bg-[#f5faf2]'
                    : 'text-[#475355] hover:text-[#181b1d]'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link href="/contact" className="btn-primary text-sm mt-3 justify-center" onClick={() => setMobileOpen(false)}>
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
