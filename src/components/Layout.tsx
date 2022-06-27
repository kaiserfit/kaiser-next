import Image from "next/image";
import React, { useState } from "react";
import { Children } from "../lib/types";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import KaiserfitLogo from "./KaiserfitLogo";

const darkMode = true;

function Layout({ children }: Children) {
  const [showMenu, setShowMenu] = useState(false);
  // console.log(showMenu);

  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="bg-gray-100 text-slate-800 relative dark:bg-slate-800 dark:text-gray-100 h-screen overflow-x-hidden">
          <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />

          <div className="min-h-screen">{children}</div>

          <Footer />
          {/* {showMenu && (
            <div className="h-full w-full absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"></div>
          )} */}
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
      <header className="bg-transparent w-full py-4 px-4 pr-8 md:pr-16 flex justify-between items-center fixed top-0 left-0 z-20">
        <Link passHref href={"/"}>
          <div
            onClick={() => setShowMenu(false)}
            className="relative w-1/2 md:w-1/3 lg:w-1/5 h-12 cursor-pointer"
          >
            <Image
              src={"/images/kaiser.webp"}
              alt={"yep"}
              layout="fill"
              objectFit="contain"
              className="absolute"
              priority
            />
            {/* <KaiserfitLogo /> */}
          </div>
        </Link>
        <button className="text-3xl relative z-20" onClick={handleToggle}>
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
      className={`absolute top-0 w-1/2 sm:w-1/3 ${
        showMenu ? "right-0" : "-right-full"
      } z-10 bg-green-600 min-h-screen transition-all duration-500 ease-in-out pt-20 flex flex-col items-center`}
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
