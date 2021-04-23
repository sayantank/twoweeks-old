import React from "react";
import { GitHub, Twitter } from "react-feather";

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
      </div>
      <p className="font-semibold text-gray-800">
        <a
          href="https://sayantank.vercel.app"
          className="hover:underline underline lg:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sayantan Karmakar
        </a>
      </p>
    </div>
  );
};

export default Footer;
