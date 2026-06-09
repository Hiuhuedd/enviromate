'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';

export default function ContactPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'siteContent'));
        if (snap.exists()) {
          setContent({ ...defaultContent, ...(snap.data() as SiteContent) });
        }
      } catch {
        // Silently fall back to defaultContent
      }
    }
    fetchContent();
  }, []);

  const contact = content.contact;
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { 
        setStatus('sent'); 
        setForm({ name: '', email: '', phone: '', service: '', message: '' }); 
      }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-end bg-[#f5faf2] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5faf2] to-[#e8f5e0]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(93,174,62,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-36 w-full">
          <div className="section-label mb-5" style={{ color: '#5dae3e' }}>Reach Out</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#181b1d] leading-tight mb-4">{contact.title}</h1>
          <p className="text-[#475355] text-lg max-w-xl">{contact.subtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left info */}
            <div>
              <div className="section-label mb-6">Contact Information</div>
              <h2 className="font-display text-3xl font-bold text-[#181b1d] mb-8">Let&apos;s Start a Conversation</h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f5faf2] flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#5dae3e]" />
                  </div>
                  <div className="space-y-4">
                    <a href="tel:0112252039" className="block group">
                      <p className="text-[#869399] text-xs font-semibold tracking-widest uppercase mb-1 group-hover:text-[#5dae3e] transition-colors">Consultancy Support</p>
                      <p className="text-[#181b1d] font-medium group-hover:text-[#5dae3e] transition-colors">0112 252039</p>
                    </a>
                    <a href="tel:+254113251379" className="block group">
                      <p className="text-[#869399] text-xs font-semibold tracking-widest uppercase mb-1 group-hover:text-[#5dae3e] transition-colors">Construction Support</p>
                      <p className="text-[#181b1d] font-medium group-hover:text-[#5dae3e] transition-colors">+254 113 251 379</p>
                    </a>
                  </div>
                </div>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#f5faf2] flex items-center justify-center shrink-0 group-hover:bg-[#e8f5e0] transition-colors">
                    <Mail size={20} className="text-[#5dae3e]" />
                  </div>
                  <div>
                    <p className="text-[#869399] text-xs font-semibold tracking-widest uppercase mb-1">Email</p>
                    <p className="text-[#181b1d] font-medium group-hover:text-[#5dae3e] transition-colors break-all">{contact.email}</p>
                  </div>
                </a>
              </div>

              <div className="divider-gradient mb-8" />
              <div className="section-label mb-6">Our Offices</div>
              <div className="space-y-4">
                {contact.offices.map((office) => (
                  <div key={office.city} className="bg-[#f5faf2] rounded-xl p-5 border border-[rgba(93,174,62,0.12)] flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin size={18} className="text-[#5dae3e]" />
                    </div>
                    <div>
                      <p className="text-[#181b1d] font-semibold">{office.city}</p>
                      <p className="text-[#869399] text-sm">{office.address}</p>
                      {office.floor && <p className="text-[#5dae3e] text-xs">{office.floor}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#b6c4c4] text-sm mt-6"><span className="text-[#869399]">P.O Box:</span> 269-00100, Nairobi</p>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 border border-[rgba(93,174,62,0.15)] shadow-md">
                <h3 className="font-display text-2xl font-bold text-[#181b1d] mb-2">Send Us a Message</h3>
                <p className="text-[#869399] text-sm mb-8">Fill in the form and we&apos;ll get back to you within 24 hours.</p>

                {status === 'sent' ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={52} className="text-[#5dae3e] mx-auto mb-4" />
                    <h4 className="text-[#181b1d] text-xl font-bold mb-2">Message Received!</h4>
                    <p className="text-[#869399]">Thank you for reaching out. Our team will contact you shortly.</p>
                    <button onClick={() => setStatus('idle')} className="btn-outline mt-6 text-sm">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#475355] text-xs font-semibold tracking-widest uppercase mb-2">Full Name *</label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe"
                          className="w-full bg-[#f5faf2] border border-[rgba(93,174,62,0.2)] rounded-lg px-4 py-3 text-[#181b1d] placeholder-[#b6c4c4] text-sm focus:outline-none focus:border-[#5dae3e] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[#475355] text-xs font-semibold tracking-widest uppercase mb-2">Email *</label>
                        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@company.com"
                          className="w-full bg-[#f5faf2] border border-[rgba(93,174,62,0.2)] rounded-lg px-4 py-3 text-[#181b1d] placeholder-[#b6c4c4] text-sm focus:outline-none focus:border-[#5dae3e] transition-colors" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#475355] text-xs font-semibold tracking-widest uppercase mb-2">Phone</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+254 7XX XXX XXX"
                          className="w-full bg-[#f5faf2] border border-[rgba(93,174,62,0.2)] rounded-lg px-4 py-3 text-[#181b1d] placeholder-[#b6c4c4] text-sm focus:outline-none focus:border-[#5dae3e] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[#475355] text-xs font-semibold tracking-widest uppercase mb-2">Service Needed</label>
                        <select name="service" value={form.service} onChange={handleChange}
                          className="w-full bg-[#f5faf2] border border-[rgba(93,174,62,0.2)] rounded-lg px-4 py-3 text-[#475355] text-sm focus:outline-none focus:border-[#5dae3e] transition-colors">
                          <option value="">Select service...</option>
                          <optgroup label="Construction">
                            <option>Civil Works</option><option>Building Works</option>
                            <option>Renovation</option><option>Plant Hire</option>
                            <option>Road Works</option><option>Water & Sanitation</option>
                          </optgroup>
                          <optgroup label="Consultancy">
                            <option>Health & Safety Audit</option><option>Environmental Impact Assessment</option>
                            <option>Fire Safety Audit</option><option>ISO Certification</option>
                            <option>EHS Training</option><option>Other Consultancy</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#475355] text-xs font-semibold tracking-widest uppercase mb-2">Your Message *</label>
                      <textarea name="message" required value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project or requirement..."
                        className="w-full bg-[#f5faf2] border border-[rgba(93,174,62,0.2)] rounded-lg px-4 py-3 text-[#181b1d] placeholder-[#b6c4c4] text-sm focus:outline-none focus:border-[#5dae3e] transition-colors resize-none" />
                    </div>
                    {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again or call us directly.</p>}
                    <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70">
                      {status === 'sending' ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
