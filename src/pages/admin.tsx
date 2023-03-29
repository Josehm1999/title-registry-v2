import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router.js';
import { NextPage, NextPageContext } from 'next/types';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { env } from '../env/server.mjs';
import { env as env_client } from '../env/client.mjs';
import { useProtected } from '../hooks/useProtected';
import { useIsMounted } from '../hooks/isMounted';

const Admin: NextPage = () => {
  const handleLogout = useProtected();
  const mounted = useIsMounted();
  const { disconnect } = useDisconnect();
  const { address, connector } = useAccount();

  // const [hasAddressChanged, setAddressChange] = useState(address);
  // const handleSignout = async () => {
  //   await signOut({ callbackUrl: '/' });
  //   disconnect();
  // };

  // useEffect(() => {
  //   if (address != hasAddressChanged) {
  //     handleSignout;
  //   }
  // }, [hasAddressChanged]);
  return (
    <div>{mounted ? <button onClick={handleLogout}>Logout</button> : null}</div>
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
