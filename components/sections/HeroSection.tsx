'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HeroContent } from '@/lib/content';

const FALLBACK_BG = 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&auto=format&fit=crop&q=80';

interface Props { content: HeroContent; }

export default function HeroSection({ content }: Props) {
  const bgImage = content.backgroundImage || FALLBACK_BG;
  const badges = content.badges?.length
    ? content.badges
    : ['NCA Registered', 'Est. 2018', 'ISO Compliant Advisory', 'OSHA Certified'];

  // Parse \n or literal newline in headline to render line breaks and green highlights
  const headlineParts = content.headline.split(/\\n|\n/);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">
      {/* Background Image — fully dynamic */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />

      {/* Dark overlay (no blur, dark color) */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div className="section-label mb-6 animate-fade-up text-[#94d03c] before:bg-[#94d03c]">
            {content.tagline}
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 animate-fade-up delay-100">
            {headlineParts.map((part, i) => (
              <span key={i}>
                {i === 0 ? <span className="text-white">{part}</span> : <><br /><span className="text-[#94d03c]">{part}</span></>}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="text-white/95 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-fade-up delay-200">
            {content.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up delay-300">
            <Link href="/construction" className="btn-primary text-base px-7 py-4 glow-green-sm">
              {content.ctaConstruction} <ArrowRight size={18} />
            </Link>
            <Link href="/consultancy" className="btn-outline text-white border-white/30 hover:border-[#5dae3e] hover:bg-[#5dae3e] text-base px-7 py-4">
              {content.ctaConsultancy} <ArrowRight size={18} />
            </Link>
          </div>

          {/* Trust badges — fully dynamic */}
          <div className="flex flex-wrap gap-5 items-center animate-fade-up delay-400">
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-2 text-xs text-white/90 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94d03c] animate-pulse-green" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-[#94d03c]" />
      </div>
    </section>
  );
}
