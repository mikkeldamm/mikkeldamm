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
      <div className="container items-center max-w-4xl px-8 mx-auto mt-8 sm:mt-12 sm:px-12 sm:flex">
        <h3 className="font-semibold sm:font-normal">Mikkel Damm</h3>
        <nav className="mt-4 ml-auto sm:mt-0">
          <ul className="flex">
            <li className="mr-5">
              <Link href="/">
                <a>About</a>
              </Link>
            </li>
            <li className="mr-5">
              <Link href="/work">
                <a>Work</a>
              </Link>
            </li>
            <li>
              <Link href="/writing">
                <a>Writing</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <div className="container max-w-4xl px-8 mx-auto mt-10 sm:px-12 sm:mt-16 xs:flex">
          <h1 className="max-w-lg text-2xl font-semibold sm:text-3xl">
            <span
              role="img"
              aria-label="Hello"
              className="inline-block animate-wiggle origin-[70%] mr-4"
            >
              👋🏻
            </span>
            Hi, I&apos;m a developer, entrepreneur and creative guy from Denmark
          </h1>
          <div className="relative flex-shrink-0 block w-48 h-48 ml-auto overflow-hidden rounded-fancy md:w-72 md:h-72">
            <Image
              src={MikkelDammPhoto}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              alt="Mikkel Damm"
              priority={true}
            />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
