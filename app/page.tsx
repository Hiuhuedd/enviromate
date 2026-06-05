import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Enviromate Technologies Limited | Civil Construction & EHS Consultancy Kenya',
  description:
    'NCA-registered civil & building contractors and environmental health & safety consultancy in Kenya. Serving government, corporate and private clients since 2018. Offices in Nairobi, Nanyuki, and Narok.',
};

export default function HomePage() {
  return <HomePageClient />;
}
