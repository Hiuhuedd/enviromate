'use client';

import { useEffect, useRef, useState } from 'react';
import { StatsContent } from '@/lib/content';

interface Props { content: StatsContent; show: boolean; }

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 2000 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

export default function StatsSection({ content, show }: Props) {
  if (!show) return null;
  return (
    <section className="bg-[#f5faf2] border-y border-[rgba(93,174,62,0.15)] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats.map((stat, i) => (
            <div key={stat.label} className="text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 font-display">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#869399] text-sm font-medium tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
