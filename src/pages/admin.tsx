import { getSession, signOut, useSession } from 'next-auth/react';
import { NextPage, NextPageContext } from 'next/types';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { env } from '../env/server.mjs';

const Admin: NextPage = () => {
  const { disconnect } = useDisconnect();
  const session = useSession();
  const { address } = useAccount();

  const handleSignout = async () => {
    await signOut({ callbackUrl: '/' });
    disconnect();
  };

  useEffect(() => {
    if (address != session.data?.address) {
      handleSignout();
    }
  }, [address]);

  return <div>Admin Page</div>;
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
