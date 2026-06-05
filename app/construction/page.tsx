import type { Metadata } from 'next';
import Link from 'next/link';
import { HardHat, Construction, Building2, Hammer, Truck, Route, Droplets, CheckCircle2, ArrowRight, Award, Users, Shield, Cog } from 'lucide-react';
import { defaultContent } from '@/lib/content';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Construction Division | Civil & Building Contractors',
  description: 'Enviromate Technologies provides civil works, building construction, and renovation services in Kenya. NCA registered.',
};

const iconMap: Record<string, React.ReactNode> = {
  Construction: <Construction size={26} className="text-[#5dae3e]" />,
  Building2:    <Building2 size={26} className="text-[#5dae3e]" />,
  Hammer:       <Hammer size={26} className="text-[#5dae3e]" />,
  Truck:        <Truck size={26} className="text-[#5dae3e]" />,
  Route:        <Route size={26} className="text-[#5dae3e]" />,
  Droplets:     <Droplets size={26} className="text-[#5dae3e]" />,
};

export default function ConstructionPage() {
  const content = defaultContent.construction;
  return (
    <>
      {/* Page Hero — light with brand overlay */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-[#f5faf2]">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5faf2] to-[#e8f5e0]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(93,174,62,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <div className="section-label mb-5" style={{ color: '#5dae3e' }}>Construction Division</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#181b1d] leading-tight mb-6">
            Civil &amp; Building<br />
            <span className="text-gradient">Construction Excellence</span>
          </h1>
          <p className="text-[#475355] text-lg max-w-2xl mb-8">{content.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            {['NCA Registered', 'Government & Private Projects', '7+ Years Experience'].map((b) => (
              <span key={b} className="text-xs font-semibold px-3 py-1.5 bg-white text-[#5dae3e] rounded-full border border-[rgba(93,174,62,0.2)] shadow-sm">{b}</span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* About */}
      <section className="section-py bg-[#f5faf2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-5">Our Construction Arm</div>
              <h2 className="font-display text-4xl font-bold text-[#181b1d] mb-6">From Infrastructure to Finishing — We Do It All</h2>
              <p className="text-[#475355] leading-relaxed mb-6">{content.body}</p>
              <p className="text-[#475355] leading-relaxed mb-8">
                Our client portfolio spans Government Agencies, Public Sector, International Development Agencies, and Private/Commercial organisations — each project delivered with precision and integrity.
              </p>
              <Link href="/contact" className="btn-primary">Request a Quote <ArrowRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Users size={22} className="text-[#5dae3e]" />, title: 'Expert Personnel', desc: 'Highly qualified management and operations teams' },
                { icon: <Cog size={22} className="text-[#5dae3e]" />, title: 'Modern Equipment', desc: 'Earth movers, heavy concrete and lightweight machinery' },
                { icon: <Shield size={22} className="text-[#5dae3e]" />, title: 'Safety First', desc: 'Full safety gear and protocols on every site' },
                { icon: <Award size={22} className="text-[#5dae3e]" />, title: 'NCA Registered', desc: 'Compliant with all government construction regulations' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover">
                  <div className="w-10 h-10 rounded-lg bg-[#f5faf2] flex items-center justify-center mb-3">{item.icon}</div>
                  <p className="text-[#181b1d] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-[#869399] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center mx-auto mb-4">What We Offer</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#181b1d]">Our Construction Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-7 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover group">
                <div className="w-12 h-12 rounded-xl bg-[#f5faf2] flex items-center justify-center mb-5 group-hover:bg-[#e8f5e0] transition-colors">
                  {iconMap[service.icon] ?? <HardHat size={26} className="text-[#5dae3e]" />}
                </div>
                <h3 className="text-[#181b1d] font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-[#869399] text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client types */}
      <section className="section-py bg-[#f5faf2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mx-auto mb-4">Who We Serve</div>
            <h2 className="font-display text-4xl font-bold text-[#181b1d]">Our Client Base</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Government Agencies', desc: 'Ministry projects, county governments, and public infrastructure' },
              { title: 'Parastatals', desc: 'State corporations, utilities, and development authorities' },
              { title: 'International NGOs', desc: 'Development agencies and international organizations' },
              { title: 'Private Sector', desc: 'Commercial developers, industries, and residential clients' },
            ].map((client) => (
              <div key={client.title} className="bg-white rounded-xl p-6 border border-[rgba(93,174,62,0.12)] shadow-sm card-hover text-center">
                <CheckCircle2 size={28} className="text-[#5dae3e] mx-auto mb-3" />
                <h4 className="text-[#181b1d] font-semibold mb-2">{client.title}</h4>
                <p className="text-[#869399] text-sm">{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
