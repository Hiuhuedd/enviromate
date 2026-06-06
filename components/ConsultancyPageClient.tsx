'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Flame, Leaf, AlertTriangle, Award, GraduationCap, Wind, Zap, ArrowRight, CheckCircle2, FileCheck, Users, HardHat, ClipboardCheck, Eye } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';
import CtaBanner from '@/components/sections/CtaBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

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

const serviceTabs = {
  construction: {
    label: 'Construction Safety',
    icon: <HardHat size={16} />,
    services: [
      {
        title: 'EHS Site Supervision (Construction)',
        description: 'Dedicated safety officers stationed on-site to inspect work conditions, ensure compliance, and maintain safety logs.'
      },
      {
        title: 'Asbestos Removal & Disposal',
        description: 'Safe and certified asbestos surveying, containment, dismantling, removal, and disposal according to NEMA and EMCA standards.'
      },
      {
        title: 'Safety Signage Supply & Installation',
        description: 'Clear, durable hazard warning signs and directional symbols matching NCA and OSHA standards.'
      }
    ]
  },
  consultancy: {
    label: 'EHS Consultancy',
    icon: <ClipboardCheck size={16} />,
    services: [
      {
        title: 'EHS Compliance Gap Analysis',
        description: 'A comprehensive review of your operations against OSHA and EMCA regulations to identify and resolve vulnerabilities.'
      },
      {
        title: 'Legionella Risk Assessment',
        description: 'Expert water system audits to detect, control, and prevent Legionella bacteria risks in buildings.'
      },
      {
        title: 'Fairtrade / SEDEX / Global Gap Audits',
        description: 'Specialist pre-audit assessments and compliance mapping for international agricultural and trade standards.'
      },
      {
        title: 'Occupational Medical Examinations',
        description: 'Coordinating statutory medical checkups and health surveillance for workers in high-risk environments.'
      }
    ]
  },
  training: {
    label: 'Safety Training',
    icon: <GraduationCap size={16} />,
    services: [
      {
        title: 'Electrical Safety Audits & Training',
        description: 'Training workers to recognize electrical hazards, implement LOTO procedures, and handle high-voltage equipment safely.'
      },
      {
        title: 'Confined Space Entry Training',
        description: 'Hands-on instruction on rescue plans, gas detector usage, and safe access protocols for tight workspaces.'
      },
      {
        title: 'Work at Height & Heavy Lifting',
        description: 'Rigorous training on fall arrest systems, harness safety, and crane/lifting rigging operations.'
      },
      {
        title: 'Chemical Safety Training',
        description: 'Educating personnel on chemical storage, MSDS sheets, spill response, and safe disposal procedures.'
      },
      {
        title: 'Machinery Safety Training',
        description: 'Safe machine operation techniques, guard compliance, and emergency shutdown procedures for operators.'
      },
      {
        title: 'Supervisory Skills Training',
        description: 'Empowering EHS committee members and managers to lead safety initiatives and enforce compliance.'
      },
      {
        title: 'Industrial Relations Training',
        description: 'Workplace conflict resolution, compliance with labor laws, and promoting positive management-worker relations.'
      },
      {
        title: 'Emergency Response Procedures',
        description: 'Drills and training for fire, medical, natural disasters, and building evacuation scenarios.'
      },
      {
        title: 'Food Safety Training',
        description: 'HACCP principles, hygiene standards, and temperature control training for kitchen and production staff.'
      }
    ]
  },
  surveys: {
    label: 'EHS Surveys',
    icon: <Eye size={16} />,
    services: [
      {
        title: 'Employee & Work Environment Surveys',
        description: 'Scientific monitoring of indoor air quality, thermal comfort, ergonomics, and workplace stress levels.'
      },
      {
        title: 'Vibration Surveys',
        description: 'Precise assessment of hand-arm and whole-body vibration levels in heavy industry to prevent long-term injury.'
      },
      {
        title: 'Noise Surveys',
        description: 'Comprehensive noise mapping and occupational noise level measurements to protect hearing and ensure OSHA compliance.'
      },
      {
        title: 'Air Quality Surveys',
        description: 'Indoor and outdoor emission testing, particulates analysis, and environmental monitoring to meet health standards.'
      }
    ]
  },
  fire_extinguishers: {
    label: 'Fire Extinguishers',
    icon: <Flame size={16} />,
    services: [
      {
        title: 'Firefighting Equipment Supply & Service',
        description: 'Installation and regular maintenance/testing of fire extinguishers, hose reels, hydrants, and detection systems.'
      },
      {
        title: 'Fire Extinguisher Supply',
        description: 'Procuring and delivering high-quality, certified dry powder, CO2, water, and foam fire extinguishers.'
      },
      {
        title: 'Fire Extinguisher Servicing & Refilling',
        description: 'Annual servicing, pressure testing, hydrostatic testing, and refilling of all fire suppression cylinders.'
      }
    ]
  },
  ppe_supply: {
    label: 'Supply of PPEs',
    icon: <ShieldCheck size={16} />,
    services: [
      {
        title: 'PPE Supply & Installation',
        description: 'High-quality, certified personal protective equipment (helmets, harnesses, boots) tailored to site-specific hazards.'
      },
      {
        title: 'Body Protection Supply',
        description: 'Standard and specialized overalls, high-visibility reflector jackets, chemical suits, and fire-retardant wear.'
      },
      {
        title: 'Respiratory & Face Protection',
        description: 'Procuring particulate respirators, gas masks, safety goggles, face shields, and ear defenders for industrial use.'
      }
    ]
  }
};

export default function ConsultancyPageClient() {
  const [contentState, setContentState] = useState<SiteContent>(defaultContent);
  const [activeTab, setActiveTab] = useState<'construction' | 'consultancy' | 'training' | 'surveys' | 'fire_extinguishers' | 'ppe_supply'>('construction');
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  useEffect(() => {
    if (
      tabParam === 'training' ||
      tabParam === 'consultancy' ||
      tabParam === 'construction' ||
      tabParam === 'surveys' ||
      tabParam === 'fire_extinguishers' ||
      tabParam === 'ppe_supply'
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    async function fetchContent() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'siteContent'));
        if (snap.exists()) {
          setContentState({ ...defaultContent, ...(snap.data() as SiteContent) });
        }
      } catch {
        // Silently fall back to defaultContent
      }
    }
    fetchContent();
  }, []);

  const content = contentState.consultancy;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
  } as const;

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
      <section className="section-py bg-[#f5faf2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="section-label justify-center mx-auto mb-4">Additional Services</div>
            <h2 className="font-display text-4xl font-bold text-[#181b1d]">More Ways We Can Help</h2>
            <p className="text-[#869399] mt-3 max-w-xl mx-auto">Beyond our core offerings, we provide a comprehensive range of specialist EHS and compliance services.</p>
          </div>

          {/* Compressed Tabbed Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#e8f2ec] p-1 rounded-xl flex gap-1 border border-[rgba(70,144,102,0.1)] shadow-inner w-full max-w-4xl overflow-x-auto scrollbar-none flex-nowrap shrink-0">
              {(Object.keys(serviceTabs) as Array<keyof typeof serviceTabs>).map((tabKey) => {
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 relative shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#469066] to-[#088038] text-white shadow-md'
                        : 'text-[#475355] hover:text-[#469066] hover:bg-white/50'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#469066]'}>
                      {serviceTabs[tabKey].icon}
                    </span>
                    <span>{serviceTabs[tabKey].label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animating the grid of categorized services */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
            >
              {serviceTabs[activeTab].services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, translateY: -2 }}
                  className="flex flex-col gap-2 bg-white rounded-xl p-5 border border-[rgba(70,144,102,0.08)] shadow-sm hover:shadow-md hover:border-[#469066]/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f5faf2] flex items-center justify-center shrink-0 border border-[rgba(70,144,102,0.06)] mt-0.5">
                      <CheckCircle2 size={15} className="text-[#469066]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#181b1d] text-sm font-bold leading-snug">{service.title}</h4>
                      <p className="text-[#869399] text-xs leading-relaxed mt-1">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
