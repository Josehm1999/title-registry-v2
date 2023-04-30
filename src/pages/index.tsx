import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HouseIcon from '../../public/images/house-icon.png';

const Home: NextPage = () => {
  return (
    <main className='my-[7vh] mx-auto w-full max-w-4xl md:my-[10vh]'>
      <div className='container mx-auto flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8'>
        <Image
          src={HouseIcon}
          alt={'House-Logo'}
          width={65}
          height={65}
          className='pulse h-24 w-24 cursor-pointer select-none opacity-80 grayscale hue-rotate-15 transition hover:opacity-100 hover:brightness-125 hover:grayscale-0'
        />
        <div className='mb-8'></div>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            ¡Encuentra el <span className='text-blue-600'>terreno</span> de tus
            sueños!{' '}
          </h1>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'></h1>
          <p className='mx-auto mt-3 max-w-4xl text-xl text-gray-500 sm:mt-4'>
            Realiza tus transacciones de titulos de propiedad de manera segura y
            transparente y gracias a la tecnología blockchain.
          </p>
          <div className='mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center'>
            <div className='rounded-md shadow'>
              <Link
                href='/marketplace'
                className='flex w-full items-center justify-center rounded-md
              border border-transparent bg-blue-700 px-8 py-3 text-base
              font-medium text-white transition delay-100 ease-in-out hover:bg-blue-600 md:py-4 md:px-10
              md:text-lg'
              >
                Explora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
