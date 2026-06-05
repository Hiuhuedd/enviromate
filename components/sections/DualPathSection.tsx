'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ConstructionContent, ConsultancyContent } from '@/lib/content';

interface Props {
  content: ConstructionContent;
  consultancy: ConsultancyContent;
}

const FALLBACK_CONSTRUCTION = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=70';
const FALLBACK_CONSULTANCY = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=70';

export default function DualPathSection({ content, consultancy }: Props) {
  const [hovered, setHovered] = useState<'construction' | 'consultancy' | null>(null);

  const constructionHighlights = content.highlights?.length
    ? content.highlights
    : ['Civil Works & Infrastructure', 'Building & Finishing Works', 'Renovation Projects', 'Plant & Machinery Hire'];

  const consultancyHighlights = consultancy.highlights?.length
    ? consultancy.highlights
    : ['Health & Safety Audits', 'Environmental Impact Assessments', 'ISO Certification Support', 'Occupational Safety Training'];

  const constructionImg = content.image || FALLBACK_CONSTRUCTION;
  const consultancyImg = consultancy.image || FALLBACK_CONSULTANCY;

  return (
    <section className="section-py bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-4 justify-center">Our Two Divisions</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#181b1d] mb-4">
            Which service are you looking for?
          </h2>
          <p className="text-[#869399] max-w-xl mx-auto">
            Enviromate operates two distinct, expert divisions. Select the one that matches your needs.
          </p>
        </div>

        {/* Dynamic Expanding Flex Container */}
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto items-stretch">
          
          {/* Construction Division Card */}
          <div
            onMouseEnter={() => setHovered('construction')}
            onMouseLeave={() => setHovered(null)}
            className={`relative bg-white rounded-xl overflow-hidden border border-[rgba(93,174,62,0.15)] shadow-sm flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${
                hovered === 'construction'
                  ? 'md:flex-[1.5_1.5_0%] shadow-xl ring-1 ring-[#5dae3e]/30 scale-[1.01] z-10'
                  : hovered === 'consultancy'
                  ? 'md:flex-[0.6_0.6_0%] opacity-40 saturate-50 scale-[0.99]'
                  : 'md:flex-[1_1_0%]'
              }
            `}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#5dae3e] to-[#94d03c]" />

            {/* Division image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={constructionImg}
                alt={content.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-out ${
                  hovered === 'construction' ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#181b1d] mb-2 transition-colors duration-300">
                  {content.title}
                </h3>
                <p className="text-[#869399] text-xs mb-4 font-semibold tracking-wide uppercase">{content.subtitle}</p>
                <p className="text-[#475355] leading-relaxed mb-7 text-sm">{content.body}</p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 mb-8">
                  {constructionHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#475355]">
                      <CheckCircle2 size={15} className="text-[#5dae3e] shrink-0" /> 
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/construction"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300
                    ${
                      hovered === 'construction'
                        ? 'bg-[#5dae3e] text-white shadow-lg shadow-[#5dae3e]/20 translate-x-1'
                        : 'bg-gray-50 text-[#5dae3e] hover:bg-[#5dae3e] hover:text-white'
                    }
                  `}
                >
                  Explore Construction Services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Consultancy Division Card */}
          <div
            onMouseEnter={() => setHovered('consultancy')}
            onMouseLeave={() => setHovered(null)}
            className={`relative bg-white rounded-xl overflow-hidden border border-[rgba(93,174,62,0.15)] shadow-sm flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${
                hovered === 'consultancy'
                  ? 'md:flex-[1.5_1.5_0%] shadow-xl ring-1 ring-[#469066]/30 scale-[1.01] z-10'
                  : hovered === 'construction'
                  ? 'md:flex-[0.6_0.6_0%] opacity-40 saturate-50 scale-[0.99]'
                  : 'md:flex-[1_1_0%]'
              }
            `}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#088038] to-[#469066]" />

            {/* Division image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={consultancyImg}
                alt={consultancy.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-out ${
                  hovered === 'consultancy' ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            <div className="p-8 md:p-10 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-[#181b1d] mb-2 transition-colors duration-300">
                  {consultancy.title}
                </h3>
                <p className="text-[#869399] text-xs mb-4 font-semibold tracking-wide uppercase">{consultancy.subtitle}</p>
                <p className="text-[#475355] leading-relaxed mb-7 text-sm">{consultancy.body}</p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 mb-8">
                  {consultancyHighlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#475355]">
                      <CheckCircle2 size={15} className="text-[#469066] shrink-0" /> 
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href="/consultancy"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300
                    ${
                      hovered === 'consultancy'
                        ? 'bg-[#469066] text-white shadow-lg shadow-[#469066]/20 translate-x-1'
                        : 'bg-gray-50 text-[#469066] hover:bg-[#469066] hover:text-white'
                    }
                  `}
                >
                  Explore Consultancy Services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-[#869399] text-sm mt-8">
          Not sure which applies to you?{' '}
          <Link href="/contact" className="text-[#5dae3e] hover:underline font-medium">Talk to our team →</Link>
        </p>
      </div>
    </section>
  );
}
