import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import MainLayout from 'components/layouts/MainLayout';

import MikkelDammPhoto from 'public/images/mikkeldamm.jpg';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Portfolio</title>
      </Head>
      <header className="relative h-24 max-w-screen-xl p-5 mx-auto md:flex md:justify-between md:items-center">
        <Link href="/">
          <a className="relative flex items-center font-semibold">
            <div className="relative mr-3 overflow-hidden rounded-full w-7 h-7">
              <Image
                src={MikkelDammPhoto}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                alt="Mikkel Damm"
                priority={true}
              />
            </div>
            Mikkel Damm
          </a>
        </Link>
        <nav className="mt-4 ml-auto font-bold md:mt-4">
          <ul className="flex">
            <li className="mr-4">
              <Link href="/">
                <a>about.</a>
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/work">
                <a>work.</a>
              </Link>
            </li>
            <li>
              <Link href="/writing">
                <a>writing.</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-screen-xl px-5 pt-8 m-auto mb-10 md:pt-28">
        <div className="mb-6 text-6xl">
          <span
            role="img"
            aria-label="Hello"
            className="inline-block animate-wiggle origin-[70%] mr-4"
          >
            👋🏻
          </span>
        </div>
        <h1 className="text-5xl font-bold text-primary lg:w-4/5 md:text-7xl">
          Freelance developer, entrepreneur and creative guy from Denmark.
        </h1>
        <p className="block mt-6 mb-10 text-xl tracking-tight text-secondary lg:w-2/3">
          For more than 10 years, I have been working as a frontend developer at large companies to
          early startups. Below are some of the works I&apos;ve involved with and in.
        </p>
        <div className="grid gap-2 md:grid-cols-3 md:grid-flow-row-dense">
          <Link href="/works/emanager">
            <a className="relative flex flex-col justify-between bg-[#f1f4f6] p-5 lg:p-8">
              <h3 className="text-3xl font-bold tracking-tighter text-gray-800">eManager</h3>
              <p className="mt-1 text-gray-600">Founder & CEO</p>
            </a>
          </Link>
          <Link href="/works/ownrs">
            <a className="relative flex flex-col justify-between bg-[#c6f5dd] p-5 lg:p-8">
              <h3 className="text-3xl font-bold tracking-tighter text-gray-800">ownrs</h3>
              <p className="mt-1 text-gray-600">Freelance developer</p>
            </a>
          </Link>
          <Link href="/works/hoestt">
            <a className="relative flex flex-col justify-between bg-[#fffbd5] p-5 lg:p-8">
              <h3 className="text-3xl font-bold tracking-tighter text-gray-800">hoestt</h3>
              <p className="mt-1 text-gray-600">Mobile app</p>
            </a>
          </Link>
        </div>
      </main>
    </MainLayout>
  );
}
