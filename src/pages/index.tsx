import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import HouseLogo from '../../public/images/house-logo-unsplash.jpg';

const Home: NextPage = () => {
  const session = useSession();
  return (
    <div className='hero h-screen bg-blue-200'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <Image
          src={HouseLogo}
          alt='Hero Logo'
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div>
          <h1 className='text-justify text-5xl font-bold text-black'>
            El mercado de títulos de propiedad basado en blockchain en el que
            puedes confiar!
          </h1>
          <p className='py-6 text-gray-500'>
            Transacciones de titulos de propiedad seguras, transparentes y
            descentralizadas gracias a la tecnología blockchain.
          </p>

          {session.status === 'authenticated' ? (
            <Link
              className='inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              href='/purchase-property'
              passHref
            >
              Explora
            </Link>
          ) : (
            <ConnectButton label={'Inicia Sesión'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
