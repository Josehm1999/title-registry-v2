import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession } from 'next-auth/react';
import { useProtected } from '../hooks/useProtected';
import { useAdminInfo } from '../context/adminsContext';

export default function Navbar() {
  const handleLogout = useProtected();
  const session = useSession();
  const { isAdmin, isRegionalAdmin } = useAdminInfo();

  return (
    <nav className='flex flex-row items-center justify-between bg-black p-5'>
      <h1 className='py-4 px-4 text-3xl font-bold text-white'>SRTP</h1>
      <div className='flex flex-row items-center'>
        <Link
          href='/'
          className='mr-4 p-6 text-xl text-gray-700 transition delay-100 ease-in-out hover:text-white'
        >
          Home
        </Link>
        <Link
          href='/marketplace'
          className='mr-4 p-6 text-xl text-gray-700 transition delay-100 ease-in-out hover:text-white'
        >
          Explora
        </Link>
        <Link
          href='/sell-property'
          className='mr-4 p-6 text-xl text-gray-700 transition delay-100 ease-in-out hover:text-white'
        >
          Vender
        </Link>

        {session.status === 'authenticated' && (isAdmin || isRegionalAdmin) ? (
          <>
            <Link
              href='/admin'
              className='mr-4 p-6 text-xl text-gray-700 transition delay-100 ease-in-out hover:text-white'
            >
              Admin
            </Link>

            <button
              className='inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <ConnectButton label={'Inicia Sesión'} />
        )}
      </div>
    </nav>
  );
}
