import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession } from 'next-auth/react';
import { useAdminInfo } from '../context/adminsContext';

export default function Navbar() {
	const session = useSession();
	const { isAdmin, isRegionalAdmin } = useAdminInfo();

	return (
		<nav className='flex flex-row items-center justify-between bg-base-300 p-5'>
			<h1 className='py-4 px-4 text-3xl font-bold text-white'>Sunarpcito</h1>
			<div className='flex flex-row items-center'>
				<Link
					href='/'
					className='mr-4 p-6 text-xl text-white transition delay-100 ease-in-out hover:text-white'
				>
					Home
				</Link>
				<Link
					href='/marketplace'
					className='mr-4 p-6 text-xl text-white transition delay-100 ease-in-out hover:text-white'
				>
					Explora
				</Link>
				<Link
					href='/sell-property'
					className='mr-4 p-6 text-xl text-white transition delay-100 ease-in-out hover:text-white'
				>
					Vender
				</Link>

				{session.status === 'authenticated' && !isAdmin && !isRegionalAdmin && (
					<Link
						href='/dashboard'
						className='mr-4 p-6 text-xl text-white transition delay-100 ease-in-out hover:text-white'
					>
						Mis propiedades
					</Link>
				)}

				{session.status === 'authenticated' && (isAdmin || isRegionalAdmin) && (
					<>
						<Link
							href='/admin'
							className='mr-4 p-6 text-xl text-white transition delay-100 ease-in-out hover:text-white'
						>
							Admin
						</Link>
					</>
				)}
				<ConnectButton label={'Inicia Sesión'} />
			</div>
		</nav>
	);
}
