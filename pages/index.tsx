import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import MainLayout from 'components/layouts/MainLayout';

import MikkelDammPhoto from 'public/images/mikkeldamm.jpg';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Mikkel Damm - Freelance Developer from Denmark</title>
      </Head>
      <header className="relative flex items-center h-24 max-w-screen-xl p-5 mx-auto">
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
            Mikkel<span className="inline md:hidden">.</span>
            <span className="hidden md:inline">&nbsp;Damm.</span>
          </a>
        </Link>
        <nav className="ml-auto font-bold">
          <ul className="flex">
            <li className="mr-4">
              <Link href="/">
                <a className="transition-colors hover:text-action">about.</a>
              </Link>
            </li>
            <li className="mr-4">
              <Link href="/work">
                <a className="transition-colors hover:text-action">work.</a>
              </Link>
            </li>
            <li>
              <Link href="/writing">
                <a className="transition-colors hover:text-action">writing.</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-screen-xl px-5 pt-2 m-auto mb-10 md:pt-10 lg:pt-28">
        <div className="mb-2 text-3xl md:mb-6 md:text-6xl">
          <span
            role="img"
            aria-label="Hello"
            className="inline-block animate-wiggle origin-[70%] mr-4 rerun"
          >
            👋🏻
          </span>
        </div>
        <h1 className="text-3xl font-bold text-primary lg:w-4/5 md:text-7xl">
          Freelance developer, entrepreneur and creative guy from Denmark.
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
      <footer className="border-t border-gray-100">
        <div className="max-w-screen-xl px-5 py-8 m-auto">
          <ul className="flex flex-wrap font-semibold">
            <li className="mr-4">
              <a
                href="https://github.com/mikkeldamm"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-colors hover:text-[#6e5494]"
              >
                github.
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://www.linkedin.com/in/mikkeldamm/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-colors hover:text-[#0b65c2]"
              >
                linkedin.
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://twitter.com/MikkelDamm"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-colors hover:text-[#1da1f1]"
              >
                twitter.
              </a>
            </li>
            <li>
              <a
                href="https://unsplash.com/@dammeren"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-colors hover:text-[#8f7a69]"
              >
                unsplash.
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </MainLayout>
  );
}
