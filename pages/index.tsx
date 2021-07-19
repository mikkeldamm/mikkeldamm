import Head from 'next/head';

import MainLayout from 'components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Portfolio</title>
      </Head>
      <main>
        <div className="container m-auto">
          <h1 className="flex text-3xl font-semibold">
            <span role="img" aria-label="Hello" className="block animate-wiggle origin-[70%] mr-4">
              👋🏻
            </span>
            I&apos;m Mikkel Damm a developer, entrepreneur and creative gay from Denmark
          </h1>
        </div>
      </main>
    </MainLayout>
  );
}
