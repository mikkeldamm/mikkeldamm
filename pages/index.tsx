import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import MainLayout from 'components/layouts/MainLayout';

import WavingHandIcon from 'public/images/waving-hand.png';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (!window) {
      return;
    }

    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 1000);
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Freelance Developer from Denmark</title>
      </Head>
      <main className="max-w-screen-xl px-5 pt-2 m-auto mb-10 md:pt-10 lg:pt-28">
        <div className="mb-2 md:mb-6">
          <span
            role="img"
            aria-label="Hello"
            className="relative h-8 w-8 md:h-14 md:w-14 inline-block animate-wiggle origin-[70%] mr-4 rerun"
          >
            <Image
              src={WavingHandIcon}
              layout="fill"
              objectFit="cover"
              alt="Hello, I'm Mikkel Damm"
              priority={true}
            />
          </span>
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
