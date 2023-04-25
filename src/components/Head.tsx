import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { env } from '../env/client.mjs';
import { useSession } from 'next-auth/react';
import { useProtected } from '../hooks/useProtected';
import { regional_admins } from '../../constants/subgraphQueries';
import { useQuery } from '@apollo/client';

type Props = {
	isAdmin: boolean;
	isRegionalAdmin: boolean;
};

export default function Header() {
	const handleLogout = useProtected();
	const session = useSession();

	const {
		loading,
		error: subgraphQueryError,
		data: result_admins,
	} = useQuery(regional_admins);

	const isAdmin = session.data?.address == env.NEXT_PUBLIC_ADMIN_ADDRESS;
	const isRegionalAdmin = result_admins?.regionalAdmins.some(
		(address) => address.regionalAdmin === session.data?.address.toLowerCase()
	);

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

				{!subgraphQueryError &&
				!loading &&
				session.status === 'authenticated' &&
				(isAdmin || isRegionalAdmin) ? (
					<>
						<Link
							href='/admin'
							className='mr-4 p-6 text-xl text-blue-700 hover:text-blue-400'
						>
							Admin
						</Link>

						<button
							className='inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
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
