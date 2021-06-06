import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
    children: ReactNode;
};

const MainLayout = ({ children }: Props) => {

    return (<>
        <Head>
            <meta charSet="utf-8" />
            <title>Mikkel Damm</title>
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
                rel="preload"
                href="/fonts/Inter/Inter-Light.woff"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Inter/Inter-Regular.woff"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Inter/Inter-Medium.woff"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Inter/Inter-SemiBold.woff"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Inter/Inter-Bold.woff"
                as="font"
                crossOrigin=""
            />
            <base href="/" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {children}
    </>);
};

export default MainLayout;


