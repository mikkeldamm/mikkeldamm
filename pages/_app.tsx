import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';

import * as Fathom from 'fathom-client';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load('RBWBPKPV', {
      url: 'https://mite.mikkeldamm.com/script.js',
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default App;
