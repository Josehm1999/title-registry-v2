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
import networkMapping from '../../constants/networkMapping.json';
import { graphqlClient } from './_app';
import { regional_admins } from '../../constants/subgraphQueries';

type contractAddressesInterface = {
    [key: string]: contractAddressesTitleInterface;
};

type contractAddressesTitleInterface = {
    [key: string]: string[];
};

type regionalAdmin = {
    type_name: string;
    id: string;
    regional_admin: string;
    district: string;
};

const Admin: NextPage = () => {
    // First we wait for the component to render to check for the address
    const { disconnect } = useDisconnect();
    const mounted = useIsMounted();
    const session = useSession();
    const { address } = useAccount();

    const addresses: contractAddressesInterface = networkMapping;
    // const chainString = data?.chain.id ? data?.chain.id.toString() : '1337';
    const contractAddress = addresses['5']!['TitleRegistry']![0]!;

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
            <NewPropertyForm titleAddress={contractAddress} />
            <RegionalAdminForm titleAddress={contractAddress} />
        </div>
    );
};

export default Admin;

export async function getServerSideProps(context: NextPageContext) {
    const result_admins = await graphqlClient.query({ query: regional_admins });
    const session = await getSession(context);

    console.log(
        result_admins.data.regionalAdmins.some(
            (address: regionalAdmin) => address.regional_admin === session!.address
        )
    );
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
