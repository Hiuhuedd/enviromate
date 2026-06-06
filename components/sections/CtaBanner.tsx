'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function CtaBanner() {
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

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#088038] via-[#5dae3e] to-[#94d03c]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="section-label justify-center mx-auto mb-6" style={{ color: '#c4e1b9' }}>
          <span style={{ background: '#c4e1b9', display: 'inline-block', width: 24, height: 2 }} />
          Start Today
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to bring your project to life?
        </h2>
        <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">
          Whether you need a construction contractor or an EHS consultancy, our expert team is ready. Contact us for a no-obligation consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5dae3e] font-bold rounded-lg hover:bg-[#f5faf2] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Get a Free Quote <ArrowRight size={18} />
          </Link>
          <a href={`tel:${contact.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all">
            <Phone size={18} /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
