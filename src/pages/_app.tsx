import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { env } from '../env/client.mjs';
import Head from 'next/head';
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { AdminInfoProvider } from '../context/adminsContext';
import Layout from '../components/Layout';

const { chains, provider } = configureChains(
  [goerli],
  [
    infuraProvider({ apiKey: env.NEXT_PUBLIC_INFURA_ID }),
    publicProvider(),
    alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_ID }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'SRTP',
  chains,
});

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: env.NEXT_PUBLIC_GRAPH_REAL_NODE }),
  ssrMode: true,
});

const clientWagmi = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Verifica tu cuenta para poder continuar',
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Title Registry System</title>
        <meta name='title_registry_system' content='Title Registry System' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WagmiConfig client={clientWagmi}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <ApolloProvider client={graphqlClient}>
                <AdminInfoProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </AdminInfoProvider>
              </ApolloProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </>
  );
};

export default MyApp;
