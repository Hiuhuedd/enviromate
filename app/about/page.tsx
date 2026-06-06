import type { Metadata } from 'next';
import AboutPageClient from '@/components/AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Enviromate Technologies Limited',
  description: 'Learn about Enviromate Technologies Limited — Kenya\'s civil & building construction contractor and EHS consultancy firm, founded in 2018.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
