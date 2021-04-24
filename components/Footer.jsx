import React from "react";
import Link from "next/link";
import { GitHub, Twitter, Coffee } from "react-feather";

const Footer = () => {
  return (
    <div className="w-full h-48 lg:h-72 flex flex-col justify-end items-center py-4 space-y-4">
      <div className="flex space-x-4">
        <a
          href="https://github.com/sayantank/twoweeks"
          className="text-gray-800 text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="https://twitter.com/sayantank_"
          className="text-gray-800 text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
        </a>
        <a
          href="https://www.buymeacoffee.com/sayantank"
          className="text-gray-800 text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Coffee />
        </a>
      </div>
      <Link href="/privacy">
        <a
          className="font-semibold text-sm hover:underline underline lg:no-underline text-gray-800"
          href="/privacy"
        >
          Privacy Policy
        </a>
      </Link>
      <p className="font-semibold text-gray-800">
        <a
          href="https://sayantank.vercel.app"
          className="hover:underline underline lg:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sayantan Karmakar, {new Date().getFullYear()}
        </a>
      </p>
    </div>
  );
};

export default Footer;
