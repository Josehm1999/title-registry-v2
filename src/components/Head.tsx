import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { env } from '../env/client.mjs';
import { useIsMounted } from '../hooks/isMounted';
import { useSession } from 'next-auth/react';
import { useProtected } from '../hooks/useProtected';

export default function Header() {
  const handleLogout = useProtected();
  const session = useSession();
  const mounted = useIsMounted();
  const { address } = useAccount();
  const isAdmin = address === env.NEXT_PUBLIC_ADMIN_ADDRESS;
  return (
    <nav className='flex flex-row items-center justify-between border-b-2 bg-white p-5'>
      <h1 className='py-4 px-4 text-3xl font-bold text-blue-800'>SRTP</h1>
      <div className='flex flex-row items-center'>
        <Link
          href='/'
          className='mr-4 p-6 text-xl text-blue-700 hover:text-blue-400'
        >
          Home
        </Link>
        <Link
          href='/purchase-property'
          className='mr-4 p-6 text-xl text-blue-700 hover:text-blue-400'
        >
          Comprar
        </Link>
        <Link
          href='/sell-property'
          className='mr-4 p-6 text-xl text-blue-700 hover:text-blue-400'
        >
          Vender
        </Link>

        {mounted
          ? isAdmin && (
              <Link
                href='/admin'
                className='mr-4 p-6 text-xl text-blue-700 hover:text-blue-400'
              >
                Admin
              </Link>
            )
          : null}
        {session.status === 'authenticated' ? (
          <button className='py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <ConnectButton label={'Inicia Sesión'} />
        )}
      </div>
    </nav>
  );
}
