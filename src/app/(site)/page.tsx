"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [navIsOpened, setNavIsOpened] = useState(false);
  const closeNavbar = () => {
    setNavIsOpened(false);
  };
  const toggleNavbar = () => {
    setNavIsOpened((navIsOpened) => !navIsOpened);
  };
  return (
    <>
      <div
        aria-hidden={true}
        onClick={() => {
          closeNavbar();
        }}
        className={`fixed bg-gray-800/40 inset-0 z-30 ${
          navIsOpened ? "lg:hidden" : "hidden lg:hidden"
        }`}
      />
      <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-gray-100 dark:border-b-gray-900 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <div className="flex items-center min-w-max">
            <Link href="/" className="relative flex items-center gap-2.5">
              <span aria-hidden={true} className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-blue-400" />
                <span className="w-3 h-6 rounded-r-full flex bg-blue-600 mt-2" />
              </span>
              <span className="inline-flex text-lg font-bold text-blue-950 dark:text-white">
                Starter
              </span>
            </Link>
          </div>
          <div
            className={`
        absolute top-full left-0 bg-white dark:bg-gray-950 lg:bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6
        ${
          navIsOpened
            ? "visible opacity-100 translate-y-0"
            : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
        }
        `}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
              <li>
                <Link
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-blue-600"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-blue-600"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-blue-600"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-blue-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4">
              <ModeToggle />
              <Link href="/register">
                <Button className="px-6 py-3">Register</Button>
              </Link>
            </div>
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => {
                  toggleNavbar();
                }}
                aria-label="toggle navbar"
                className="outline-none border-l border-l-blue-100 dark:border-l-gray-800 pl-3 relative py-3"
              >
                <span
                  aria-hidden={true}
                  className={`
            flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
            ${navIsOpened ? "rotate-45 translate-y-[.324rem]" : ""}
          `}
                ></span>
                <span
                  aria-hidden={true}
                  className={`
            mt-2 flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
            ${navIsOpened ? "-rotate-45 -translate-y-[.324rem]" : ""}
            `}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <section className="relative pt-10 xl:pt-14">
          <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
            <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
              <h1 className="text-blue-950 dark:text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold text">
                The Best Starter template, NextAuth{" "}
                <span className="bg-blue-50 dark:bg-gray-900 dark:text-blue-300 inline-block border border-dashed border-blue-600 px-3">
                  Prisma Mongo
                </span>
              </h1>
              <p className="mt-10 text-gray-700 dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
                Follow the best practices to build a full-stack app with
                Next.js, Prisma, MongoDB, and NextAuth. This template is perfect
                for your next project.
              </p>
              <div className="mt-10 flex gap-4 justify-center lg:justify-start flex-wrap">
                <Link href="#">
                  <Button>Get Started</Button>
                </Link>
                <Link href="#">
                  <Button variant="secondary">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
              <Image
                src="/hero.webp"
                alt="happy team"
                width={1850}
                height={1200}
                className="lg:absolute w-full lg:inset-x-0 object-cover lg:h-full rounded-xl"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
