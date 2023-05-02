import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';

interface PageMeta {
  title: string;
  description: string;
}

interface Props {
  children: ReactNode;
  meta?: PageMeta;
}

export default function Layout({ children, meta: pageMeta }: Props) {
  const meta = {
    title: 'Plataforma de compra venta de Titulos de propiedad',
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        <main className='flex-1 bg-base-100'>{children}</main>
        <Footer />
      </div>
    </>
  );
}
