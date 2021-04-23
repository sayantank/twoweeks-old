import React from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

import Layout from "../components/Layout";

export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();

  if (typeof window !== "undefined" && loading) return null;

  if (session) {
    router.push("/track");
  }

  return (
    <Layout>
      <div className="flex flex-col w-full space-y-8">
        <h1 className="text-4xl font-semibold text-green-400 cursor-pointer">
          Recover
        </h1>
        <p className="text-lg font-medium text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut metus
          ipsum, mollis vitae tincidunt eget, congue in enim. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis
        </p>
        {!session && (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-green-400 hover:bg-green-500 transition-colors text-white font-semibold rounded-md w-max focus:outline-none"
          >
            Track your recovery
          </button>
        )}
      </div>
    </Layout>
  );
}
