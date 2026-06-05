'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Award } from 'lucide-react';
import { AboutContent } from '@/lib/content';

interface Props { content: AboutContent; }

const FALLBACK_ABOUT_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=70';

export default function AboutSnippet({ content }: Props) {
  const image = content.image || FALLBACK_ABOUT_IMG;

  return (
    <section className="section-py bg-[#f5faf2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <div className="section-label mb-5">{content.title || 'About Us'}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#181b1d] leading-tight mb-6">
              Engineering Excellence,{' '}
              <span className="text-gradient">Built on Integrity</span>
            </h2>
            <p className="text-[#475355] leading-relaxed mb-8">{content.body}</p>

            <div className="space-y-4 mb-10">
              <div className="bg-white rounded-xl p-5 border border-[rgba(93,174,62,0.15)] shadow-sm">
                <h4 className="text-[#5dae3e] text-xs font-bold tracking-widest uppercase mb-2">Our Vision</h4>
                <p className="text-[#475355] text-sm leading-relaxed">{content.vision}</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[rgba(93,174,62,0.15)] shadow-sm">
                <h4 className="text-[#5dae3e] text-xs font-bold tracking-widest uppercase mb-2">Our Mission</h4>
                <p className="text-[#475355] text-sm leading-relaxed">{content.mission}</p>
              </div>
            </div>

            <Link href="/about" className="btn-primary">Learn More About Us <ArrowRight size={16} /></Link>
          </div>

          {/* Right — Image + info cards */}
          <div className="flex flex-col gap-5">
            {/* Feature Image */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={image}
                alt="About Enviromate Technologies"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Info cards */}
            {[
              { icon: <Calendar size={22} className="text-[#5dae3e]" />, title: `Established ${content.founded}`, desc: 'Over 7 years delivering quality civil, building, and consultancy projects across Kenya.' },
              { icon: <MapPin size={22} className="text-[#5dae3e]" />, title: '3 Office Locations', desc: 'Nairobi (HQ), Nanyuki, and Narok — strategically positioned across the region.' },
              { icon: <Award size={22} className="text-[#5dae3e]" />, title: 'NCA Registered', desc: 'Compliant with all National Construction Authority government regulations.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#f5faf2] flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <p className="text-[#181b1d] font-semibold mb-1">{item.title}</p>
                  <p className="text-[#869399] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl p-6 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover">
              <h4 className="text-[#5dae3e] text-xs font-bold tracking-widest uppercase mb-3">Our Values</h4>
              <p className="text-[#475355] text-sm leading-relaxed">{content.values}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
