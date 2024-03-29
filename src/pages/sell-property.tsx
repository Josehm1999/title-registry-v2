import { getSession } from 'next-auth/react';
import { NextPage, NextPageContext } from 'next/types';
import { env } from '../env/server.mjs';

const SellProperty: NextPage = () => {
  return <div></div>;
};

export default SellProperty;

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
