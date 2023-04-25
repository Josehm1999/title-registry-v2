// import {
// 	RegionalAdmin,
// 	regional_admins,
// } from '../../constants/subgraphQueries';
// import React, { createContext, useContext } from 'react';
// import { graphqlClient } from '../pages/_app';
// import { getSession } from 'next-auth/react';
// import { env } from '../env/client.mjs';
// import useSWR from 'swr';
//
// type AdminInfo = {
// 	isAdmin: boolean;
// 	isRegionalAdmin: boolean;
// };
//
// const DataContext = createContext<any | undefined>(undefined);
//
// export function DataProvider({ children }: { children: React.ReactNode }) {
// 	// const mounted = useIsMounted();
// 	// if (mounted) {
// 	// 	console.log(data);
// 	// }
// 	const session = await getSession();
// 	// console.log(result_admins);
// 	const isAdmin = session!.address == env.NEXT_PUBLIC_ADMIN_ADDRESS;
// 	const isRegionalAdmin = result_admins.data.regionalAdmins.some(
// 	  (address) => address.regionalAdmin === session!.address.toLowerCase()
// 	);
// 	// const data: AdminInfo = { isAdmin, isRegionalAdmin };
// 	return <DataContext.Provider value={1}>{children}</DataContext.Provider>;
// }
//
// export function useData(): any {
// 	const context = useContext(DataContext);
// 	if (context === undefined) {
// 		throw new Error('useData must be used within a DataProvider');
// 	}
// 	return context;
// }

import { createContext, useState, useEffect, useContext } from 'react';

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

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/regionalAdmin');
			const data = await response.json();
			console.log(data);
		};
		fetchData();
	}, []);

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
