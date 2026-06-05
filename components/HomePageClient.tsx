'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import DualPathSection from '@/components/sections/DualPathSection';
import AboutSnippet from '@/components/sections/AboutSnippet';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaBanner from '@/components/sections/CtaBanner';

export default function HomePageClient() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'siteContent'));
        if (snap.exists()) {
          // Deep merge so any new fields added to defaultContent are always present
          setContent({ ...defaultContent, ...(snap.data() as SiteContent) });
        }
      } catch {
        // Silently fall back to defaultContent on network error
      }
    }
    fetchContent();
  }, []);

  return (
    <>
      <HeroSection content={content.hero} />
      <StatsSection content={content.stats} show={content.visibility.showStats} />
      <DualPathSection content={content.construction} consultancy={content.consultancy} />
      <AboutSnippet content={content.about} />
      <ProjectsPreview content={content.projects} show={content.visibility.showProjects} />
      <TestimonialsSection content={content.testimonials} show={content.visibility.showTestimonials} />
      <CtaBanner />
    </>
  );
}
