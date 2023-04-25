import { getSession, signOut } from 'next-auth/react';
import { NextPage, NextPageContext } from 'next/types';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { env } from '../env/client.mjs';
import { useIsMounted } from '../hooks/isMounted';
import RegionalAdminForm from '../components/RegionalAdminForm';
import NewPropertyForm from '../components/NewPropertyForm';
import networkMapping from '../../constants/networkMapping.json';
import { graphqlClient } from './_app';
import { regional_admins } from '../../constants/subgraphQueries';
import { Session } from 'next-auth';

type contractAddressesInterface = {
  [key: string]: contractAddressesTitleInterface;
};

type contractAddressesTitleInterface = {
  [key: string]: string[];
};

type Props = {
  session?: Session;
  isAdmin: boolean;
  isRegionalAdmin: boolean;
};

const Admin: NextPage<Props> = ({ session, isAdmin }) => {
  const { disconnect } = useDisconnect();
  const mounted = useIsMounted();
  const { address } = useAccount();

  const addresses: contractAddressesInterface = networkMapping;
  const contractAddress = addresses['5']!['TitleRegistry']![0]!;

  const handleSignout = async () => {
    await signOut({ callbackUrl: '/' });
    disconnect();
  };

  useEffect(() => {
    if (mounted) {
      if (address != session?.address) {
        handleSignout();
      }
    }
  }, [address]);

  return (
    <div className='flex flex-col items-center justify-center overflow-auto bg-blue-400 py-10'>
      <NewPropertyForm titleAddress={contractAddress} />
      {isAdmin && <RegionalAdminForm titleAddress={contractAddress} />}
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context: NextPageContext) {
  const result_admins = await graphqlClient.query({ query: regional_admins });
  const session = await getSession(context);

  const isAdmin = session!.address == env.NEXT_PUBLIC_ADMIN_ADDRESS;
  const isRegionalAdmin = result_admins.data.regionalAdmins.some(
    (address) => address.regionalAdmin === session!.address.toLowerCase()
  );

  if (!session || (!isAdmin && !isRegionalAdmin)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session, isAdmin },
  };
}
