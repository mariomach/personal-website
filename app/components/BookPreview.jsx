'use client';
import { useEffect, useRef, useState } from 'react';


const books = [
  { id: 'dragon-boy', description: "A Dragon Finds “Himself” In a World of Humans", title: 'The Dragon Boy', cover: '/dragon-boy.png', url: 'https://drive.google.com/file/d/1z0IcChBLVWU_Xv3_iqvL7-jZoVvua4js/view?usp=sharing' },
  { id: 'dark-horse', description: "Cast out and underestimated, an individual horse discovers a hidden path to freedom, learning that true independence comes from self-reliance and courage.", title: 'The Dark Horse', cover: '/dark-horse.jpg', url: 'https://drive.google.com/file/d/1IjyVTWSwn6KoTPGyweeiP0pfXZGl4Ii6/view?usp=sharing' },
  { id: 'playful-dog', description: "A story about living many lifetimes in one. When you stop clinging… and start to play.", title: 'The Playful Dog', cover: '/playful-dog.jpg', url: 'https://drive.google.com/file/d/1Hof7hSjBF_toOA7zEfCLKNz46R91FWQd/view?usp=sharing' },
  { id: 'great-race', description: "Twelve animals enter a great race where talent, hard work, and ambition collide.", title: 'The Great Race', cover: '/great-race.jpg', url: 'https://drive.google.com/file/d/1CSBi2oSeo12GwUS6vPs42t0ZA3mM8YkP/view?usp=sharing' },
];

export default function BookPreview() {
  return <div className="w-full mt-20">{books.map(book => <OpeningBook key={book.id} book={book} />)}</div>;
}

function OpeningBook({ book }) {
  const bookUrl = book.url;
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
      const stickyHeight = section.current.querySelector('.book-sticky')?.offsetHeight ?? window.innerHeight;
      const distance = Math.max(1, rect.height - stickyHeight);
      const next = window.innerWidth < 600
        ? (window.innerHeight * 0.8 - rect.top) / (window.innerHeight * 0.6)
        : -rect.top / distance;
      setProgress(Math.max(0, Math.min(1, next)));
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
  const p = reduce ? 0 : Math.min(1, progress / 0.8);
  const movement = { transform: `translateX(${p*39}%) rotateY(${-8 + p*8}deg)` };

  return (
    <div className="book-preview w-full">
      <section ref={section} id={book.id} className="book-scroll" aria-label={book.title}>
        <div className="book-sticky">
          <div className="mb-6 px-4 text-center sm:mb-8">
            <p className="mb-2 text-sm sm:text-xs uppercase tracking-[.2em]">a book by Mario Mach</p>
            <h2 className="text-4xl tracking-[-.04em] sm:text-5xl">{book.title.toLowerCase()}</h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed sm:text-base">{book.description}</p>
          </div>
          <div className="book-stage book-stage-open">
            <a href={bookUrl} target="_blank" rel="noopener noreferrer" aria-label={`Read ${book.title} in Google Drive (opens in a new tab)`} className="book-object block cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#254add]" style={movement}>
              <div className="book-pages" aria-hidden="true" />
              <div className="book-spine" aria-hidden="true">{book.title.toUpperCase()} · MARIO MACH</div>
              <div className="book-title-page">
                <strong className="my-6 px-4 text-center font-serif text-2xl leading-tight sm:text-4xl">{book.title}</strong>
                <span className="text-[10px] tracking-[.15em]">MARIO MACH</span>
              </div>
              <div className="book-cover" style={{ transform: `translateZ(15px) rotateY(${-p*153}deg)` }}>
                <img src={book.cover} loading="lazy" decoding="async" width="2000" height="2000" alt={`${book.title} book cover by Mario Mach`} className="book-cover-front" />
                <img src={book.cover} loading="lazy" decoding="async" width="2000" height="2000" alt="" aria-hidden="true" className="book-cover-back" />
              </div>
            </a>
          </div>
          <div className="mt-8 text-center">
            <a href={bookUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#254add] px-7 py-3 text-lg sm:text-base font-medium text-[#fff2b6] transition-colors hover:bg-[#1939b5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#254add]"
              aria-label={`Read ${book.title} in Google Drive (opens in a new tab)`}>
              Read the book <span aria-hidden="true">↗</span>
            </a>
            <div className="mt-3 text-center">
              <p className="text-[28px] sm:text-xl tracking-[.15em]" aria-label="Five stars">★★★★★</p>
              <p className="mt-1 text-lg sm:text-sm">kids loves it!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
