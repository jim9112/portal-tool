import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Link from 'next/link';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'The Portal Tool',
  description: 'Manage your HubSpot portal with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className='py-4'>
          <ul
            role='navigation'
            className='flex gap-4 items-center justify-center text-secondary'
          >
            <li className='hover:hover:text-accent'>
              <Link href='/'>Home</Link>
            </li>
            <li className='hover:hover:text-accent'>
              <Link href='/cms-tools'>CMS Tools</Link>
            </li>
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
