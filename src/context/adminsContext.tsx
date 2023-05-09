import { getSession, useSession } from 'next-auth/react';
import { createContext, useState, useEffect, useContext } from 'react';
import { RegionalAdmin, RegionalAdmins } from '../../constants/subgraphQueries';
import { env } from '../env/client.mjs';

type AdminInfo = {
	isAdmin: boolean;
	isRegionalAdmin: boolean;
};

export const AdminInfoContext = createContext<AdminInfo | undefined>(undefined);

export const AdminInfoProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isRegionalAdmin, setIsRegionalAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	const session = useSession();
	const fetchData = async () => {
		const response = await fetch('/api/regionalAdmin');
		const result_admins: RegionalAdmins = await response.json();
		if (session) {
			setIsAdmin(session?.data?.address === env.NEXT_PUBLIC_ADMIN_ADDRESS);
		}
		setIsRegionalAdmin(
			result_admins.regionalAdmins.some(
				(address: RegionalAdmin) =>
					address.regionalAdmin === session?.data?.address.toLowerCase()
			)
		);
	};

	useEffect(() => {
		fetchData();
	}, [session, isRegionalAdmin, isAdmin]);

	return (
		<AdminInfoContext.Provider value={{ isRegionalAdmin, isAdmin }}>
			{children}
		</AdminInfoContext.Provider>
	);
};

export function useAdminInfo(): any {
	const context = useContext(AdminInfoContext);
	if (context === undefined) {
		throw new Error(
			'useAdminInfo must be used within a AdminInfoContext.Provider'
		);
	}
	return context;
}
