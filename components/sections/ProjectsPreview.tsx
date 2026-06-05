'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react';
import { ProjectsContent } from '@/lib/content';

interface Props { content: ProjectsContent; show: boolean; }

const categoryColors: Record<string, string> = {
  building:   'bg-[#e8f5e0] text-[#5dae3e]',
  civil:      'bg-[#e8f5e9] text-[#388e3c]',
  road:       'bg-[#e8f5ee] text-[#469066]',
  water:      'bg-[#e3f2fd] text-[#0288d1]',
  renovation: 'bg-[#fafafa] text-[#869399]',
};
const categoryLabels: Record<string, string> = {
  building: 'Building Works', civil: 'Civil Works',
  road: 'Road Works', water: 'Water Works', renovation: 'Renovation',
};

export default function ProjectsPreview({ content, show }: Props) {
  if (!show) return null;
  const featured = content.projects.slice(0, 3);

  return (
    <section className="section-py bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-label mb-4">Our Work</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#181b1d] leading-tight">{content.title}</h2>
            <p className="text-[#869399] mt-3 max-w-md">{content.subtitle}</p>
          </div>
          <Link href="/projects" className="btn-outline shrink-0">View All Projects <ArrowRight size={16} /></Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden card-hover border border-[rgba(93,174,62,0.12)] shadow-sm group">
              {/* Project image — dynamic or placeholder */}
              <div className="h-48 relative bg-gradient-to-br from-[#f5faf2] to-[#e8f5e0] overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 size={52} className="text-[rgba(93,174,62,0.25)] group-hover:text-[rgba(93,174,62,0.4)] transition-colors" />
                  </div>
                )}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[project.category]}`}>
                    {categoryLabels[project.category]}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[#181b1d] font-semibold text-base mb-2 group-hover:text-[#5dae3e] transition-colors leading-snug">{project.title}</h3>
                <p className="text-[#869399] text-xs leading-relaxed mb-4">{project.description}</p>
                <div className="flex items-center justify-between text-xs text-[#b6c4c4]">
                  <div className="flex items-center gap-1.5"><MapPin size={11} />{project.location}</div>
                  <div className="flex items-center gap-1.5"><Calendar size={11} />{project.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
