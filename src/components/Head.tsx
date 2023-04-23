import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { env } from '../env/client.mjs';
import { useSession } from 'next-auth/react';
import { useProtected } from '../hooks/useProtected';
import { useQuery } from '@apollo/client';
import { regional_admins as regional_admins_query } from '../../constants/subgraphQueries';

type regionalAdmin = {
  type_name: string;
  id: string;
  regional_admin: string;
  district: string;
};

export default function Header() {
  const handleLogout = useProtected();
  const session = useSession();
  const isAdmin = session.data?.address === env.NEXT_PUBLIC_ADMIN_ADDRESS;
  // const {
  //   loading,
  //   error: subgraphQueryError,
  //   data: regional_admins,
  // } = useQuery(regional_admins_query );

  // const is_regional_admin = regional_admins.some(
  //   (address: regionalAdmin) => address.regional_admin === session.data?.address
  // );

  // console.log(!loading && !subgraphQueryError ? regionalAdmins : null);
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

        {session.status === 'authenticated' ? (
          <Link
            href='/admin'
            className='mr-4 p-6 text-xl text-blue-700 hover:text-blue-400'
          >
            Admin
          </Link>
        ) : null}
        {session.status === 'authenticated' ? (
          <button
            className='inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <ConnectButton label={'Inicia Sesión'} />
        )}
      </div>
    </nav>
  );
}
