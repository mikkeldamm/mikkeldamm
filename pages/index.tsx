import Head from 'next/head';

import MainLayout from 'components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Portfolio</title>
      </Head>
      <main className="p-10">
        <h1 className="flex text-7xl">
          <span role="img" aria-label="Hello" className="block animate-wiggle origin-[70%]">
            👋🏻
          </span>
        </h1>
      </main>
    </MainLayout>
  );
}
