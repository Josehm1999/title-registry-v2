import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { env } from '../env/client.mjs';
import Head from 'next/head';
import Header from '../components/Head';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'SRTP',
  chains,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: env.NEXT_PUBLIC_GRAPH_REAL_NODE,
});

const clientWagmi = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head>
        <title>Title Registry System</title>
        <meta name='title_registry_system' content='Title Registry System' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WagmiConfig client={clientWagmi}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains}>
              <ApolloProvider client={client}>
                <Header {...pageProps} />
                <Component {...pageProps} />
              </ApolloProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </div>
  );
};

export default MyApp;
