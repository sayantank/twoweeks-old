import React from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

import Layout from "../components/Layout";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (typeof window !== "undefined" && loading) return null;

  return (
    <Layout>
      <div className="flex flex-col w-full space-y-8">
        <h1 className="text-4xl font-semibold text-blue-500 cursor-pointer">
          TwoWeeks
        </h1>
        <p className="text-lg font-medium text-gray-800">
          Track your recovery from COVID-19 at home in the midst of this
          pandemic with{" "}
          <span className="font-semibold text-blue-500">TwoWeeks</span>. You can
          also share your recovery with your doctor, family and friends with
          just a link!
        </p>
        <button
          onClick={
            session
              ? () => router.push("/track")
              : () =>
                  signIn(null, {
                    callbackUrl:
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/track"
                        : "https://twoweeks.co.in/track",
                  })
          }
          className="px-4 py-2 bg-green-400 hover:bg-green-500 transition-colors text-white font-semibold rounded-md w-max focus:outline-none"
        >
          Track your recovery
        </button>
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg text-gray-800 font-semibold">
            Other resources
          </h2>
          <ul>
            <li className="flex flex-col space-y-2">
              <h3 className="text-gray-800 font-medium hover:underline underline lg:no-underline">
                <a
                  href="https://covidhelpers.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CovidHelpers
                </a>
              </h3>
              <p className="text-sm">
                Find the latest help and resources that has been verified by the
                Twitter community as per your location and requirements.
              </p>
            </li>
          </ul>
          <p className="text-sm text-gray-400">
            Contact me on{" "}
            <a
              className="hover:underline underline lg:no-underline text-gray-500"
              href="https://twitter.com/sayantank_"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>{" "}
            to share your resources as well!
          </p>
        </div>
      </div>
    </Layout>
  );
}
