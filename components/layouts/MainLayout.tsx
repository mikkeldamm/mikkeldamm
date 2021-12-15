import React, { ReactNode } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import MikkelDammPhoto from 'public/images/mikkeldamm.jpg';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Mikkel Damm - Freelance Developer from Denmark</title>
        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mikkel Damm - Freelance Developer from Denmark" />
        <meta property="og:url" content="https://mikkeldamm.com" />
        <meta property="og:site_name" content="Mikkel Damm" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mikkeldamm.com" />
        <meta property="twitter:title" content="Mikkel Damm - Freelance Developer from Denmark" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              <Link href="/about">
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
      {children}
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
    </>
  );
};

export default MainLayout;
