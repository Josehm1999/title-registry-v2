import Sidebar from '../components/Sidebar';
import {
  ListedProperty,
  listed_properties_by_user,
} from '../../constants/subgraphQueries';
import { graphqlClient } from './_app';
import { PropertyTitles } from '../components/PropertyTitleCard';
import { getSession, signOut } from 'next-auth/react';
import { NextPageContext } from 'next';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useIsMounted } from '../hooks/isMounted';
import { Session } from 'next-auth';

export default function Dashboard({
  propertyTitles,
  session,
}: {
  propertyTitles: ListedProperty[];
  session?: Session;
}) {
  const { disconnect } = useDisconnect();
  const handleSignout = async () => {
    await signOut({ callbackUrl: '/' });
    disconnect();
  };
  const mounted = useIsMounted();
  const { address } = useAccount();

  useEffect(() => {
    if (mounted) {
      if (address != session?.address) {
        handleSignout();
      }
    }
  }, [address]);

  return (
    <Sidebar>
      <main className='mt-6 mr-6 grid grid-cols-1 gap-x-6 gap-y-10 text-white sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 '>
        <PropertyTitles
          propertyTitles={propertyTitles}
          page_name={'Dashboard'}
        ></PropertyTitles>
      </main>
    </Sidebar>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);
    const result_properties = await graphqlClient.query({
      query: listed_properties_by_user,
      variables: {
        owner_address: session?.address!,
      },
    });
    const propertyTitles = result_properties.data.propertyListeds;
    return {
      props: { session, propertyTitles },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {},
    };
  }
}
