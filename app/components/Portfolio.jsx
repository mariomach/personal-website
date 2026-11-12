import Image from 'next/image';
import BookPreview from './BookPreview';

const contactClass = "inline-flex size-12 items-center justify-center rounded-full transition-colors hover:bg-[#254add]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#254add]";

export default function Portfolio({ variant = 'fade' }) {
  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col items-center px-6 pt-14 text-[#254add] sm:px-10 sm:pt-16">
      <main className="flex w-full flex-1 flex-col items-center">
        <h1 className="text-center text-[clamp(1.75rem,4.6vw,4rem)] leading-[1.12] font-medium tracking-[-0.045em]">
          “The past gives us memories. The present is shaped by our moods. But the future gives us something greater: a vision of who <span className="underline decoration-2 underline-offset-4">we might</span> become.”
        </h1>
        <div className="mt-12 w-[min(76vw,390px)] overflow-hidden rounded-[22px] border-2 border-[#254add] shadow-[8px_9px_0_0_#254add] sm:mt-14">
          <Image
            src="/portrait.jpg"
            alt="Mario Mach sitting in a café"
            width={2048}
            height={2048}
            priority
            sizes="(max-width: 540px) 76vw, 390px"
            className="aspect-[4/5] w-full object-cover object-[center_35%]"
          />
        </div>
        <BookPreview variant={variant} />
      </main>
      <footer className="flex flex-col items-center pt-16 pb-8 sm:pt-14 sm:pb-9">
        <p className="text-lg tracking-[-0.02em] sm:text-xl">get in touch</p>
        <nav aria-label="Contact Mario" className="mt-3 flex items-center gap-5">
          <a href="mailto:imariomach@gmail.com" aria-label="Email Mario at imariomach@gmail.com" title="imariomach@gmail.com" className={contactClass}>
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="m3 6 9 7 9-7" />
            </svg>
          </a>
          <a href="https://www.instagram.com/mariomachx/" target="_blank" rel="noopener noreferrer" aria-label="Mario on Instagram, opens in a new tab" title="@mariomachx" className={contactClass}>
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
}
