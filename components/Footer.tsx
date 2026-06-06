'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Share2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'siteContent'));
        if (snap.exists()) {
          setContent({ ...defaultContent, ...(snap.data() as SiteContent) });
        }
      } catch {
        // Silently fall back to defaultContent
      }
    }
    fetchContent();
  }, []);

  const contact = content.contact;
  const hqOffice = contact.offices.find(o => o.city.toLowerCase().includes('nairobi')) || contact.offices[0];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[rgba(93,174,62,0.15)]">

      {/* CTA Band */}
      <div className="bg-gradient-to-r from-[#088038] via-[#5dae3e] to-[#94d03c] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold font-display">Ready to start your project?</h3>
            <p className="text-green-100 mt-1 text-sm">Talk to our team today — no obligation.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#5dae3e] font-bold rounded-lg hover:bg-[#f5faf2] transition-all whitespace-nowrap shadow-md"
          >
            Contact Us <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10">
                <Image src="/logo-icon.png" alt="Enviromate" fill sizes="40px" className="object-contain" />
              </div>
              <div>
                <p className="text-[#181b1d] font-bold text-sm tracking-wide">ENVIROMATE</p>
                <p className="text-[#5dae3e] text-xs tracking-[0.15em] font-medium">TECHNOLOGIES LTD</p>
              </div>
            </div>
            <p className="text-[#869399] text-sm leading-relaxed max-w-xs mb-6">
              A regional leader in civil & building construction and environmental health & safety consultancy — registered with the National Construction Authority (NCA).
            </p>
            <p className="text-[#5dae3e] font-display italic text-lg">&ldquo;Come Home To Quality&rdquo;</p>
            <div className="flex gap-3 mt-6">
              {contact.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[rgba(93,174,62,0.25)] flex items-center justify-center text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] hover:bg-[#f5faf2] transition-all"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
              )}
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[rgba(93,174,62,0.25)] flex items-center justify-center text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] hover:bg-[#f5faf2] transition-all"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              )}
              {contact.tiktok && (
                <a
                  href={contact.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[rgba(93,174,62,0.25)] flex items-center justify-center text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] hover:bg-[#f5faf2] transition-all"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.21-.42-.45-.6-.69-.06 2.44-.02 4.88-.03 7.32-.03 2.03-.43 4.14-1.78 5.68-1.52 1.71-3.99 2.44-6.22 2.2-2.39-.1-4.72-1.48-5.83-3.61-1.21-2.22-1.04-5.18.45-7.23 1.34-1.89 3.65-2.88 5.97-2.58v4.11c-1.24-.15-2.5.3-3.26 1.3-.77.95-.82 2.37-.12 3.41.69 1.07 2.02 1.62 3.28 1.38 1.13-.19 2.05-1.15 2.22-2.29.13-1.07.03-2.15.05-3.22V.02h-.17z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#181b1d] text-sm font-semibold tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Construction', href: '/construction' },
                { label: 'Consultancy', href: '/consultancy' },
                { label: 'Projects', href: '/projects' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#869399] text-sm hover:text-[#5dae3e] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-[#c4e1b9] group-hover:w-5 group-hover:bg-[#5dae3e] transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#181b1d] text-sm font-semibold tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g,'')}`}
                  className="flex items-start gap-3 text-[#869399] hover:text-[#5dae3e] transition-colors group"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  <span className="text-sm">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-[#869399] hover:text-[#5dae3e] transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  <span className="text-sm break-all">{contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#869399]">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#5dae3e]" />
                <div className="text-sm">
                  <p className="text-[#181b1d] font-medium">HQ: Nairobi</p>
                  {hqOffice ? (
                    <>
                      <p>{hqOffice.address}</p>
                      {hqOffice.floor && <p>{hqOffice.floor}</p>}
                    </>
                  ) : (
                    <>
                      <p>Mountain Mall, Thika Road</p>
                      <p>3rd Floor, Room D8</p>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gradient mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#b6c4c4] text-xs">
            © {year} Enviromate Technologies Limited. All rights reserved. | Reg: PVT-RXUZK7K
          </p>
          <p className="text-[#b6c4c4] text-xs">
            NCA Registered Civil & Building Contractors
          </p>
        </div>
      </div>
    </footer>
  );
}
