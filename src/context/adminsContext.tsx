import {
  RegionalAdmin,
  regional_admins,
} from '../../constants/subgraphQueries';
import React, { createContext, useContext } from 'react';
import { graphqlClient } from '../pages/_app';
import { getSession } from 'next-auth/react';
import { env } from '../env/client.mjs';

type AdminInfo = {
  isAdmin: boolean;
  isRegionalAdmin: boolean;
};

const DataContext = createContext<number | undefined>(undefined);

export async function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const result_admins = await graphqlClient.query({ query: regional_admins });
  const session = await getSession();
  console.log(result_admins);
  // const isAdmin = session!.address == env.NEXT_PUBLIC_ADMIN_ADDRESS;
  // const isRegionalAdmin = result_admins.data.regionalAdmins.some(
  //   (address) => address.regionalAdmin === session!.address.toLowerCase()
  // );
  // const data: AdminInfo = { isAdmin, isRegionalAdmin };
  return <DataContext.Provider value={1}>{children}</DataContext.Provider>;
}

export function useData(): number {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
