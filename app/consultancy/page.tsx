import { Suspense } from 'react';
import type { Metadata } from 'next';
import ConsultancyPageClient from '@/components/ConsultancyPageClient';

export const metadata: Metadata = {
  title: 'Consultancy Division | EHS, Environmental & Safety Consultancy',
  description: 'Enviromate Technologies provides health & safety audits, EIA, ISO certification, fire safety audits, and EHS training in Kenya.',
};

export default function ConsultancyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f5faf2]">
        <div className="w-10 h-10 border-4 border-[#469066] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConsultancyPageClient />
    </Suspense>
  );
}
