import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Flame, Leaf, AlertTriangle, Award, GraduationCap, Wind, Zap, ArrowRight, CheckCircle2, FileCheck, Users } from 'lucide-react';
import { defaultContent } from '@/lib/content';
import CtaBanner from '@/components/sections/CtaBanner';

export const metadata: Metadata = {
  title: 'Consultancy Division | EHS, Environmental & Safety Consultancy',
  description: 'Enviromate Technologies provides health & safety audits, EIA, ISO certification, fire safety audits, and EHS training in Kenya.',
};

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck:   <ShieldCheck size={26} className="text-[#469066]" />,
  Flame:         <Flame size={26} className="text-[#469066]" />,
  Leaf:          <Leaf size={26} className="text-[#469066]" />,
  AlertTriangle: <AlertTriangle size={26} className="text-[#469066]" />,
  Award:         <Award size={26} className="text-[#469066]" />,
  GraduationCap: <GraduationCap size={26} className="text-[#469066]" />,
  Wind:          <Wind size={26} className="text-[#469066]" />,
  Zap:           <Zap size={26} className="text-[#469066]" />,
};

const additionalServices = [
  'Electrical Safety Audits & Training','Confined Space Entry Training',
  'Work at Height & Heavy Lifting','Chemical Safety Training',
  'Machinery Safety Training','Supervisory Skills Training',
  'Industrial Relations Training','Asbestos Management',
  'EHS Site Supervision (Construction)','EHS Compliance Gap Analysis',
  'Legionella Risk Assessment','Emergency Response Procedures',
  'PPE Supply & Installation','Safety Signage Supply & Installation',
  'Employee & Work Environment Surveys','Fairtrade / SEDEX / Global Gap Audits',
  'Occupational Medical Examinations','Vibration Surveys',
  'Food Safety Training','Firefighting Equipment Supply & Service',
];

export default function ConsultancyPage() {
  const content = defaultContent.consultancy;
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end bg-[#f5faf2] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5faf2] to-[#e8f5e0]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(70,144,102,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <div className="section-label mb-5" style={{ color: '#469066' }}>Consultancy Division</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#181b1d] leading-tight mb-6">
            Environmental Health<br />
            <span style={{ background: 'linear-gradient(135deg,#469066,#088038)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              & Safety Experts
            </span>
          </h1>
          <p className="text-[#475355] text-lg max-w-2xl mb-8">{content.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            {['OSHA Compliance','EIA & Environmental Audits','ISO Certification Support','20+ Specialized Services'].map((b) => (
              <span key={b} className="text-xs font-semibold px-3 py-1.5 bg-white text-[#469066] rounded-full border border-[rgba(70,144,102,0.2)] shadow-sm">{b}</span>
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
              <div className="section-label mb-5">Why Enviromate Consultancy</div>
              <h2 className="font-display text-4xl font-bold text-[#181b1d] mb-6">Keeping Your Business Safe, Compliant &amp; Productive</h2>
              <p className="text-[#475355] leading-relaxed mb-6">{content.body}</p>
              <p className="text-[#475355] leading-relaxed mb-8">
                We operate in full compliance with OSHA 2007, EMCA 1999, and all relevant subsidiary legislation. Our advisers are registered with the Director of Occupational Health and Safety.
              </p>
              <Link href="/contact" className="btn-primary">Book a Consultation <ArrowRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FileCheck size={22} className="text-[#469066]" />, title: 'Statutory Compliance', desc: 'OSHA, EMCA, and all relevant Kenyan legislation' },
                { icon: <ShieldCheck size={22} className="text-[#469066]" />, title: 'Registered Advisers', desc: 'Registered with Director of Occupational H&S' },
                { icon: <Users size={22} className="text-[#469066]" />, title: 'Sector Experience', desc: 'Construction, manufacturing, hospitality, agriculture & more' },
                { icon: <Award size={22} className="text-[#469066]" />, title: 'ISO Expertise', desc: 'ISO 9001, 22000, 14001 & OHSAS 18001 support' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-[rgba(70,144,102,0.12)] shadow-sm card-hover">
                  <div className="w-10 h-10 rounded-lg bg-[#f5faf2] flex items-center justify-center mb-3">{item.icon}</div>
                  <p className="text-[#181b1d] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-[#869399] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center mx-auto mb-4">Core Services</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#181b1d]">Our Consultancy Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {content.services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 border border-[rgba(70,144,102,0.12)] shadow-sm card-hover group">
                <div className="w-11 h-11 rounded-xl bg-[#f5faf2] flex items-center justify-center mb-4 group-hover:bg-[#e8f5e0] transition-colors">
                  {iconMap[service.icon] ?? <ShieldCheck size={24} className="text-[#469066]" />}
                </div>
                <h3 className="text-[#181b1d] font-bold text-base mb-2">{service.title}</h3>
                <p className="text-[#869399] text-xs leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-py bg-[#f5faf2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mx-auto mb-4">Additional Services</div>
            <h2 className="font-display text-4xl font-bold text-[#181b1d]">More Ways We Can Help</h2>
            <p className="text-[#869399] mt-3 max-w-xl mx-auto">Beyond our core offerings, we provide a comprehensive range of specialist EHS and compliance services.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {additionalServices.map((service) => (
              <div key={service} className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-3 border border-[rgba(70,144,102,0.1)] shadow-sm card-hover">
                <CheckCircle2 size={14} className="text-[#469066] shrink-0" />
                <span className="text-[#475355] text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
