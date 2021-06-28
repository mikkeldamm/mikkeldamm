import Head from 'next/head';

import MainLayout from 'components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <h1 className="">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </MainLayout>
  );
}
