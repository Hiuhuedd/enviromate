'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Share2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
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
              {[Share2, Share2, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[rgba(93,174,62,0.25)] flex items-center justify-center text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] hover:bg-[#f5faf2] transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
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
                  href="tel:+254720312257"
                  className="flex items-start gap-3 text-[#869399] hover:text-[#5dae3e] transition-colors group"
                >
                  <Phone size={15} className="mt-0.5 shrink-0" />
                  <span className="text-sm">+254 720 312 257</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:enviromatetechnologies@gmail.com"
                  className="flex items-start gap-3 text-[#869399] hover:text-[#5dae3e] transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  <span className="text-sm break-all">enviromatetechnologies@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#869399]">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#5dae3e]" />
                <div className="text-sm">
                  <p className="text-[#181b1d] font-medium">HQ: Nairobi</p>
                  <p>Mountain Mall, Thika Road</p>
                  <p>3rd Floor, Room D8</p>
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
