import Head from 'next/head';
import Link from 'next/link';

import MainLayout from 'components/Layouts/MainLayout';
import Logo from 'components/Logo/Logo';

import GuideMove from 'features/guide-move/components/GuideMove';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Freelance Developer from Denmark</title>
      </Head>
      <main className="max-w-screen-xl px-5 pt-2 m-auto mb-10 md:pt-10 lg:pt-[135px]">
        <div className="relative">
          <div className="w-56 mb-14">
            <GuideMove>
              <Logo />
            </GuideMove>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary lg:w-4/5 md:text-7xl">
          Freelance developer, entrepreneur and creative guy from Denmark
          <span className="text-action">.</span>
        </h1>
        <p className="block mt-6 mb-10 text-lg tracking-tight text-secondary lg:w-2/3">
          For more than 10 years, I have been working as a frontend developer at large companies to
          early startups. Below are some of the work I&apos;ve involved with and in.
        </p>
        <div className="grid gap-2 md:grid-cols-3 md:grid-flow-row-dense">
          <Link href="/works/emanager">
            <a className="relative flex flex-col justify-between bg-[#f1f4f6] p-5 lg:p-8">
              <h3 className="text-2xl font-bold tracking-tighter text-gray-800 md:text-3xl">
                eManager
              </h3>
              <p className="mt-1 text-gray-600">Founder & CEO</p>
            </a>
          </Link>
          <Link href="/works/ownrs">
            <a className="relative flex flex-col justify-between bg-[#c6f5dd] p-5 lg:p-8">
              <h3 className="text-2xl font-bold tracking-tighter text-gray-800 md:text-3xl">
                ownrs
              </h3>
              <p className="mt-1 text-gray-600">Freelance developer</p>
            </a>
          </Link>
          <Link href="/works/hoestt">
            <a className="relative flex flex-col justify-between bg-[#fffbd5] p-5 lg:p-8">
              <h3 className="text-2xl font-bold tracking-tighter text-gray-800 md:text-3xl">
                hoestt
              </h3>
              <p className="mt-1 text-gray-600">Mobile app</p>
            </a>
          </Link>
        </div>
      </main>
    </MainLayout>
  );
}
