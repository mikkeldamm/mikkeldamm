import Head from 'next/head';

import MainLayout from 'components/layouts/MainLayout';

export default function About() {
  return (
    <MainLayout>
      <Head>
        <title>About Mikkel Damm</title>
      </Head>
      <main className="max-w-screen-xl px-5 pt-2 m-auto mb-10 md:pt-10 lg:pt-28">
        <h1 className="text-3xl font-bold text-primary lg:w-4/5 md:text-7xl">
          I&apos;m Mikkel Damm<span className="text-action">.</span>
        </h1>
        <p className="block mt-6 text-lg tracking-tight text-secondary lg:w-2/3">
          I am a freelance developer, entrepreneur and creative guy from Denmark.
        </p>
        <div className="grid gap-10 mt-12 md:mt-20 lg:mt-28 lg:gap-20 md:grid-cols-2">
          <div className="">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl text-primary">
              Personal
            </h2>
            <p className="text-lg tracking-tight md:pb-5 post text-secondary">
              I always make sure the projects is developed with the technologies most fit for the
              context and that it is easy to maintain.
            </p>
          </div>
          <div className="">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl text-primary">
              Experience
            </h2>
            <p className="text-lg tracking-tight md:pb-5 post text-secondary">
              I always make sure the projects is developed with the technologies most fit for the
              context and that it is easy to maintain.
            </p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
