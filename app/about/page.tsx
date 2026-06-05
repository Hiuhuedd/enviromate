import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Award, Users, Building2, ArrowRight } from 'lucide-react';
import { defaultContent } from '@/lib/content';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'About Us | Enviromate Technologies Limited',
  description: 'Learn about Enviromate Technologies Limited — Kenya\'s civil & building construction contractor and EHS consultancy firm, founded in 2018.',
};

export default function AboutPage() {
  const about = defaultContent.about;
  const team = defaultContent.team;
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end bg-[#f5faf2] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5faf2] to-[#e8f5e0]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(93,174,62,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <div className="section-label mb-5" style={{ color: '#5dae3e' }}>Who We Are</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#181b1d] leading-tight mb-4">
            About <span className="text-gradient">Enviromate Technologies</span>
          </h1>
          <p className="text-[#475355] text-lg max-w-2xl">Building Kenya&apos;s infrastructure and protecting its people since 2018.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Overview */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-5">The Company</div>
              <h2 className="font-display text-4xl font-bold text-[#181b1d] mb-6">A Company Built on Excellence &amp; Integrity</h2>
              <p className="text-[#475355] leading-relaxed mb-5">{about.body}</p>
              <p className="text-[#475355] leading-relaxed">Registered in Kenya under the Companies Act, Cap 486 and NCA compliant, we serve government agencies, parastatals, international development organizations, and private sector clients with equal dedication.</p>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Our Vision', text: about.vision },
                { label: 'Our Mission', text: about.mission },
                { label: 'Our Values', text: about.values },
              ].map((item) => (
                <div key={item.label} className="bg-[#f5faf2] rounded-xl p-7 border border-[rgba(93,174,62,0.15)]">
                  <div className="section-label mb-3">{item.label}</div>
                  <p className="text-[#475355] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="section-py bg-[#f5faf2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center mx-auto mb-4">Our Journey</div>
            <h2 className="font-display text-4xl font-bold text-[#181b1d]">Company at a Glance</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar size={24} className="text-[#5dae3e]" />, label: 'Founded', value: '2018', desc: 'Registered under the Companies Act, Cap 486' },
              { icon: <MapPin size={24} className="text-[#5dae3e]" />, label: 'Offices', value: '3', desc: 'Nairobi (HQ), Nanyuki, and Narok' },
              { icon: <Award size={24} className="text-[#5dae3e]" />, label: 'NCA Registered', value: '✓', desc: 'PVT-RXUZK7K | KRA PIN: P051648480W' },
              { icon: <Building2 size={24} className="text-[#5dae3e]" />, label: 'Projects', value: '50+', desc: 'Delivered within time and budget' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-7 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover text-center">
                <div className="w-12 h-12 rounded-xl bg-[#f5faf2] flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <p className="text-[#5dae3e] text-xs font-bold tracking-widest uppercase mb-2">{item.label}</p>
                <p className="text-[#181b1d] text-2xl font-bold font-display mb-2">{item.value}</p>
                <p className="text-[#869399] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Org structure */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center mx-auto mb-4">Our Structure</div>
            <h2 className="font-display text-4xl font-bold text-[#181b1d] mb-4">How We Are Organized</h2>
            <p className="text-[#869399] max-w-lg mx-auto">We embrace a modern flat organization structure — enabling high efficiency and customer-focused decision-making.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-block bg-[#f5faf2] rounded-xl px-8 py-4 border border-[rgba(93,174,62,0.2)]">
                <p className="text-[#5dae3e] text-xs font-bold tracking-widest uppercase mb-1">Board of Directors</p>
                <p className="text-[#181b1d] font-semibold">Strategic Oversight & Governance</p>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-px h-8 bg-gradient-to-b from-[#5dae3e] to-transparent" />
            </div>
            <div className="text-center mb-6">
              <div className="inline-block bg-[#f5faf2] rounded-xl px-8 py-4 border border-[rgba(93,174,62,0.3)]">
                <p className="text-[#5dae3e] text-xs font-bold tracking-widest uppercase mb-1">Managing Director</p>
                <p className="text-[#181b1d] font-semibold">Business Development & Leadership</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {team.members.map((m) => (
                <div key={m.id} className="bg-[#f5faf2] rounded-xl p-5 border border-[rgba(93,174,62,0.12)] card-hover text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5dae3e] to-[#088038] flex items-center justify-center text-white font-bold text-sm mx-auto mb-3">
                    <Users size={16} />
                  </div>
                  <p className="text-[#181b1d] font-semibold text-sm">{m.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="section-py bg-[#f5faf2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mx-auto mb-4">Where We Are</div>
            <h2 className="font-display text-4xl font-bold text-[#181b1d]">Our Offices</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {defaultContent.contact.offices.map((office) => (
              <div key={office.city} className="bg-white rounded-xl p-7 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover text-center">
                <div className="w-12 h-12 rounded-xl bg-[#f5faf2] flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-[#5dae3e]" />
                </div>
                <p className="text-[#181b1d] font-bold text-lg mb-1">{office.city}</p>
                <p className="text-[#869399] text-sm">{office.address}</p>
                {office.floor && <p className="text-[#5dae3e] text-xs mt-1">{office.floor}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#869399] mb-4">Want to know more or start a project with us?</p>
          <Link href="/contact" className="btn-primary">Get in Touch <ArrowRight size={16} /></Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
