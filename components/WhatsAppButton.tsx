'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { defaultContent, SiteContent } from '@/lib/content';

export default function WhatsAppButton() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'siteContent'));
        if (snap.exists()) {
          setContent({ ...defaultContent, ...(snap.data() as SiteContent) });
        }
      } catch {
        // Fallback silently to defaultContent
      }
    }
    fetchContent();
  }, []);

  const whatsappNumber = content.contact.whatsapp || '+254113251379';
  // Strip any spaces, dashes, or + signs to form the clean wa.me link
  const formattedNumber = whatsappNumber.replace(/[+\s\-()]/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -8, 0],
      }}
      transition={{
        x: { type: 'spring', stiffness: 260, damping: 20, delay: 0.8 },
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        },
      }}
      className="fixed bottom-6 right-6 z-50 flex items-center group cursor-pointer"
    >
      {/* Tooltip text - slides in and has hover visibility */}
      <span className="mr-3 bg-white text-gray-700 shadow-md border border-[rgba(70,144,102,0.12)] rounded-lg py-2 px-3 text-xs font-bold whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none select-none">
        Chat with us!
      </span>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative"
        aria-label="Contact us on WhatsApp"
      >
        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none" />

        {/* WhatsApp Icon SVG */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.411 1.451 5.467 0 9.916-4.445 9.918-9.916.001-2.65-1.021-5.14-2.877-6.998C17.228 1.83 14.733.808 12.083.808 6.613.808 2.167 5.252 2.165 10.722c-.001 1.936.505 3.826 1.466 5.431L2.68 20.94l4.981-1.306L7.66 19.64zm9.64-5.328c-.288-.144-1.699-.838-1.963-.933-.264-.096-.456-.144-.648.144-.192.288-.744.933-.912 1.123-.168.192-.336.216-.624.072-.288-.144-1.217-.449-2.318-1.432-.857-.764-1.436-1.708-1.604-1.996-.168-.288-.018-.444.126-.587.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.234-.564-.473-.488-.648-.497-.168-.008-.36-.01-.552-.01-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.032 3.102 4.921 4.348.687.296 1.224.473 1.64.606.691.22 1.32.181 1.817.107.553-.082 1.7-.695 1.94-.933.24-.238.24-.768.168-.912-.072-.144-.264-.24-.552-.384z" />
        </svg>
      </a>
    </motion.div>
  );
}
