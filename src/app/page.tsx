import Link from 'next/link';
import { H1 } from '@/app/components/Typography';
export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-body'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div className='container mx-auto flex flex-col items-center gap-3'>
          <H1>Portal Tools for HubSpot</H1>
          <p className='text-center max-w-lg'>
            This app copies website pages and landing pages from one HubSpot
            portal to another. In order to use it you will need to create a
            private app in each portal with "content" scopes and have the
            private app keys available
          </p>
          <Link className='btn btn-primary text-center' href='/cms-tools'>
            {' '}
            Get Started{' '}
          </Link>
        </div>
      </main>
    </div>
  );
}
