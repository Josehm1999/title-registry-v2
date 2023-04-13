import { getSession, signOut, useSession } from 'next-auth/react';
import { NextPage, NextPageContext } from 'next/types';
import Image from 'next/image';
import houseLogo from '../../public/images/house-logo-unsplash.jpg';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { env } from '../env/server.mjs';
import { useIsMounted } from '../hooks/isMounted';
import RegionalAdminForm from '../components/RegionalAdminForm';
import NewPropertyForm from '../components/NewPropertyForm';


const Admin: NextPage = () => {
  // First we wait for the component to render to check for the address
  const { disconnect } = useDisconnect();
  const mounted = useIsMounted();
  const session = useSession();
  const { address } = useAccount();

  const handleSignout = async () => {
    await signOut({ callbackUrl: '/' });
    disconnect();
  };

  useEffect(() => {
    if (mounted) {
      if (address != session.data?.address) {
        handleSignout();
      }
    }
  }, [address]);


  return (
    <div className='flex flex-col items-center justify-center overflow-auto bg-blue-400 py-10'>
      <NewPropertyForm />
      <RegionalAdminForm />
    </div>
  );
};

export default Admin;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session || session!.address != env.ADMIN_ADDRESS) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
