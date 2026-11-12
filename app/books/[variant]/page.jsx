import { notFound } from 'next/navigation';
import Portfolio from '../../components/Portfolio';

export function generateStaticParams() {
  return ['fade', 'rotate', 'open'].map(variant => ({ variant }));
}

export async function generateMetadata({ params }) {
  const { variant } = await params;
  return { title: `Book preview: ${variant} | Mario Mach`, robots: { index: false, follow: false } };
}

export default async function BookPage({ params }) {
  const { variant } = await params;
  if (!['fade', 'rotate', 'open'].includes(variant)) notFound();
  return <Portfolio variant={variant} />;
}
