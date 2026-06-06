import type { Metadata } from 'next';
import ConstructionPageClient from '@/components/ConstructionPageClient';

export const metadata: Metadata = {
  title: 'Construction Division | Civil & Building Contractors',
  description: 'Enviromate Technologies provides civil works, building construction, and renovation services in Kenya. NCA registered.',
};

export default function ConstructionPage() {
  return <ConstructionPageClient />;
}
