import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mariomach.com'),
  title: 'Mario Mach',
  description: 'hi, welcome to my site — get in touch with Mario Mach.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
