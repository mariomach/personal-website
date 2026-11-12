'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const choices = [
  ['fade', '01', 'fade + slide'],
  ['rotate', '02', '3D rotation'],
  ['open', '03', 'scroll to open'],
];

export default function BookPreview({ variant = 'fade' }) {
  const section = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const preference = () => { setReduce(media.matches); schedule(); };
    preference();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', preference);
    };
  }, []);
  const p = reduce ? (variant === 'open' ? 0 : 1) : Math.min(1, progress / 0.8);
  const movement = variant === 'fade'
    ? { opacity: reduce ? 1 : Math.min(1, 0.12 + p * 1.5), transform: `translateY(${(1-p)*90}px)` }
    : variant === 'rotate'
    ? { transform: `rotateX(${(1-p)*10}deg) rotateY(${-58 + p*58}deg) translateY(${(1-p)*35}px)` }
    : { transform: `translateX(${p*39}%) rotateY(${-8 + p*8}deg)` };

  return (
    <div className="book-preview w-full">
      <div className="mt-20 text-center">
        <p className="text-xs uppercase tracking-[.18em]">book animation previews</p>
        <nav aria-label="Choose book animation" className="mt-5 flex flex-wrap justify-center gap-2">
          {choices.map(([id, number, label]) => (
            <Link key={id} href={`/books/${id}`} aria-current={variant === id ? 'page' : undefined}
              className={`rounded-full border border-[#254add]/30 px-4 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${variant === id ? 'bg-[#254add] text-[#fff2b6]' : 'hover:bg-[#254add]/10'}`}>
              {number} · {label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-sm">scroll down to see it move ↓</p>
      </div>
      <section ref={section} className="book-scroll" aria-label={choices.find(c => c[0] === variant)?.[2]}>
        <div className="book-sticky">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs uppercase tracking-[.2em]">a book by Mario Mach</p>
            <h2 className="text-3xl tracking-[-.04em] sm:text-5xl">the dragon boy</h2>
          </div>
          <div className={`book-stage book-stage-${variant}`}>
            <div className="book-object" style={movement}>
              <div className="book-pages" aria-hidden="true" />
              <div className="book-spine" aria-hidden="true">THE DRAGON BOY · MARIO MACH</div>
              {variant === 'open' && <div className="book-title-page">
                <span className="text-[9px] uppercase tracking-[.2em]">title page mockup</span>
                <strong className="my-6 font-serif text-2xl leading-tight sm:text-4xl">The<br />Dragon Boy</strong>
                <span className="text-[10px] tracking-[.15em]">MARIO MACH</span>
              </div>}
              <div className="book-cover" style={variant === 'open' ? { transform: `translateZ(15px) rotateY(${-p*153}deg)` } : undefined}>
                <img src="/dragon-boy.png" width="2000" height="2000" alt="The Dragon Boy book cover by Mario Mach" className="book-cover-front" />
                {variant === 'open' && <div className="book-cover-back" aria-hidden="true"><span>THE DRAGON BOY</span></div>}
              </div>
            </div>
          </div>
          <p className="mt-12 text-sm opacity-70">{reduce ? 'Motion reduced to match your device settings.' : variant === 'open' ? 'keep scrolling to open the cover' : 'scroll back up to replay'}</p>
        </div>
      </section>
    </div>
  );
}
