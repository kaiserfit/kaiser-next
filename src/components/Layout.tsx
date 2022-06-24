import Image from "next/image";
import React, { useState } from "react";
import { Children } from "../lib/types";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const darkMode = true;

function Layout({ children }: Children) {
  const [showMenu, setShowMenu] = useState(false);
  // console.log(showMenu);

  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="bg-gray-100 text-slate-800 relative dark:bg-slate-800 dark:text-gray-100 h-screen overflow-x-hidden">
          <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />

          <div className="min-h-screen relative">{children}</div>

          <Footer3 />
          {showMenu && (
            <div className="min-h-screen absolute inset-0 z-[2] bg-slate-900/20 backdrop-blur-[1px]"></div>
          )}
        </div>
      </div>
    </>
  );
}

function Navbar({
  setShowMenu,
  showMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
}) {
  const handleToggle = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <header className="bg-gray-600 dark:bg-slate-600 w-full p-4 flex justify-between items-center">
        <Link passHref href={"/"}>
          <div className="relative w-1/2 md:w-1/3 lg:w-1/5 h-12 cursor-pointer">
            <Image
              src={"/images/kaiserfit_logo.webp"}
              alt={"yep"}
              layout="fill"
              className="absolute"
              priority
            />
          </div>
        </Link>
        <button className="text-2xl z-20" onClick={handleToggle}>
          <GiHamburgerMenu />
        </button>
      </header>
      <Menu setShowMenu={setShowMenu} showMenu={showMenu} />
    </>
  );
}

function Menu({
  showMenu,
  setShowMenu,
}: {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={` absolute top-0 w-1/2 sm:w-1/3 ${
        showMenu ? "right-0" : "-right-full"
      } bg-green-600 min-h-screen transition-all duration-500 ease-in-out z-10 pt-20 flex flex-col items-center`}
    >
      <Link passHref href={"/quiz"}>
        <a onClick={() => setShowMenu((prev) => !prev)}>cock 1</a>
      </Link>
      <Link passHref href={"/quiz"}>
        <a onClick={() => setShowMenu((prev) => !prev)}>cock 1</a>
      </Link>
      <Link passHref href={"/quiz"}>
        <a onClick={() => setShowMenu((prev) => !prev)}>cock 1</a>
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-100">this is the footer</footer>
  );
}

function Footer1() {
  return (
    <footer className="px-4 py-8 dark:bg-coolGray-800 dark:text-coolGray-400 bg-slate-800 text-gray-300">
      <div className="container flex flex-wrap items-center justify-center mx-auto sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-5 h-5 rounded-full dark:text-coolGray-900"
            >
              <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
            </svg>
          </div>
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <a rel="noopener noreferrer" href="#">
                Terms of Use
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <a rel="noopener noreferrer" href="#">
              Instagram
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Facebook
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function Footer2() {
  return (
    <footer className="bg-slate-600 text-gray-300">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4 max-w-[1440px] px-4 pt-12 mx-auto sm:px-6 lg:px-8">
        <div className="sm:col-span-2">
          <a title="Company" className="inline-flex items-center">
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-300 uppercase">
              Company
            </span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-300">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-300">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-300">Phone:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              850-123-5021
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-300">Email:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              info@lorem.mail
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-300">Address:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              312 Lovely Street, NY
            </a>
          </div>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-gray-300">
            Social
          </span>
          <div className="flex items-center mt-1 space-x-3">
            <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </a>
            <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </a>
            <a className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-300">
            Bacon ipsum dolor amet short ribs pig sausage prosciutto chicken
            spare ribs salami.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between py-5 border-t lg:flex-row max-w-[1440px] px-4 pt-12 mx-auto sm:px-6 lg:px-8">
        <p className="text-sm text-gray-300">
          © Copyright {new Date().getUTCFullYear()} Lorem Inc. All rights
          reserved.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a className="text-sm text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400">
              F.A.Q
            </a>
          </li>
          <li>
            <a className="text-sm text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a className="text-sm text-gray-300 transition-colors duration-300 hover:text-deep-purple-accent-400">
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function Footer3() {
  const FIRST_COL = [
    {
      label: "Order",
      link: "/order",
    },
    {
      label: "Menu",
      link: "/menu",
    },
    {
      label: "Menu QR Code",
      link: "/qr",
    },
  ];

  const SECOND_COL = [
    {
      label: "About us",
      link: "/about",
    },
    {
      label: "Contact us",
      link: "/contact",
    },
    {
      label: "Frequently Asked Questions",
      link: "/faq",
    },
  ];
  return (
    <footer className="bg-palette-lighter font-primary text-gray-900 pt-10 pb-4 print:hidden bg-gray-300 dark:bg-slate-700 dark:text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="text-lg mt-2 mb-2 font-secondary">
              101 Main St,
              <br />
              Seattle, WA 98101
            </div>
            <div className="text-lg mt-2 mb-2 font-secondary">
              (206) 123 4567
              <br />
              info@myemail.com
            </div>
            <div className="mt-6 space-x-4">
              {/* <SocialIcon icon={faTwitter} url="https://twitter.com" />
          <SocialIcon icon={faFacebook} url="https://www.facebook.com" />
          <SocialIcon icon={faInstagram} url="https://instagram.com" /> */}
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <FooterLinkColumn header="Products" items={FIRST_COL} />
              <FooterLinkColumn header="Resources" items={SECOND_COL} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm font-medium py-1">
              Copyright © {new Date().getFullYear()}{" "}
              <Link href={"/"}>
                <a>{/* {process.env.siteTitle} */} name of site</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ header, items }: any) {
  return (
    <div className="w-full my-8 lg:my-0 lg:w-4/12 px-4 ml-auto">
      <span className="block text-base font-semibold mb-2">{header}</span>
      <ul className="list-unstyled">
        {items.map((item: any, index: any) => (
          <li key={index}>
            <Link href={item.link} passHref>
              <a className="hover:text-palette-primary font-normal block text-sm py-2">
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Layout;
