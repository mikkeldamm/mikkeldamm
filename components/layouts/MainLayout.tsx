import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Mikkel Damm - Freelance Developer from Denmark</title>
        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mikkel Damm - Freelance Developer from Denmark" />
        <meta property="og:url" content="https://mikkeldamm.com" />
        <meta property="og:site_name" content="Mikkel Damm" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mikkeldamm.com" />
        <meta property="twitter:title" content="Mikkel Damm - Freelance Developer from Denmark" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  );
};

export default MainLayout;
