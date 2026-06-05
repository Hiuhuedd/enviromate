'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Building2, Filter } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, Project, SiteContent } from '@/lib/content';
import CtaBanner from '@/components/sections/CtaBanner';

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'building', label: 'Building Works' },
  { key: 'civil', label: 'Civil Works' },
  { key: 'road', label: 'Road Works' },
  { key: 'water', label: 'Water Works' },
  { key: 'renovation', label: 'Renovation' },
];

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

export default function ProjectsPage() {
  const [active, setActive] = useState('all');
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'siteContent'));
        if (snap.exists()) {
          setContent({ ...defaultContent, ...(snap.data() as SiteContent) });
        }
      } catch {
        // Silently fall back to defaultContent on network error
      }
    }
    fetchContent();
  }, []);

  const projects = content.projects.projects;
  const filtered = active === 'all' ? projects : projects.filter((p: Project) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end bg-[#f5faf2] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5faf2] to-[#e8f5e0]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(93,174,62,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <div className="section-label mb-5" style={{ color: '#5dae3e' }}>Our Work</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#181b1d] leading-tight mb-4">
            Projects &amp; <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-[#475355] text-lg max-w-2xl">A showcase of completed projects across civil works, building, road works, water works, and renovation — all delivered on time and within budget.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12 items-center">
            <Filter size={16} className="text-[#869399] mr-2" />
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setActive(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active === cat.key
                    ? 'bg-[#5dae3e] text-white border-[#5dae3e] shadow-sm'
                    : 'border-[rgba(93,174,62,0.25)] text-[#869399] hover:text-[#5dae3e] hover:border-[#5dae3e] bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project: Project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden card-hover border border-[rgba(93,174,62,0.12)] shadow-sm group">
                <div className="h-52 relative bg-gradient-to-br from-[#f5faf2] to-[#e8f5e0] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 size={56} className="text-[rgba(93,174,62,0.2)] group-hover:text-[rgba(93,174,62,0.35)] transition-colors" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[project.category]}`}>
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#181b1d] font-bold text-base mb-2 group-hover:text-[#5dae3e] transition-colors leading-snug">{project.title}</h3>
                  {project.client && <p className="text-[#5dae3e] text-xs font-medium mb-2">{project.client}</p>}
                  <p className="text-[#869399] text-xs leading-relaxed mb-4">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-[#b6c4c4]">
                    <div className="flex items-center gap-1.5"><MapPin size={11} />{project.location}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={11} />{project.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-16 text-[#b6c4c4]">No projects found in this category.</div>}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
