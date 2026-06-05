'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialsContent } from '@/lib/content';

interface Props { content: TestimonialsContent; show: boolean; }

export default function TestimonialsSection({ content, show }: Props) {
  const [active, setActive] = useState(0);
  if (!show || !content.items.length) return null;

  const prev = () => setActive((a) => (a === 0 ? content.items.length - 1 : a - 1));
  const next = () => setActive((a) => (a === content.items.length - 1 ? 0 : a + 1));
  const item = content.items[active];

  return (
    <section className="section-py bg-[#f5faf2] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(ellipse,rgba(93,174,62,0.07),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="section-label justify-center mx-auto mb-4">{content.title}</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#181b1d] mb-14">{content.subtitle}</h2>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-[rgba(93,174,62,0.15)] shadow-md relative">
          <Quote size={48} className="text-[rgba(93,174,62,0.1)] absolute top-6 left-8" />
          <blockquote className="text-[#475355] text-lg md:text-xl leading-relaxed font-display italic mb-8 relative z-10">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
          <div className="flex flex-col items-center gap-1">
            {/* Avatar — dynamic photo or gradient initial */}
            {item.avatar ? (
              <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2">
                <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="56px" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5dae3e] to-[#088038] flex items-center justify-center text-white font-bold text-lg mb-2">
                {item.name[0]}
              </div>
            )}
            <p className="text-[#181b1d] font-semibold">{item.name}</p>
            <p className="text-[#869399] text-sm">{item.title}</p>
            <p className="text-[#5dae3e] text-xs font-medium">{item.company}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-[rgba(93,174,62,0.3)] flex items-center justify-center text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] transition-all">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {content.items.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#5dae3e]' : 'w-2 bg-[#c4e1b9]'}`} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-[rgba(93,174,62,0.3)] flex items-center justify-center text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
