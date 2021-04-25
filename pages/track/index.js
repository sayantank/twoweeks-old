import React from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import axios from "axios";
import { useQuery } from "react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Layout from "../../components/Layout";
import RecordCard from "../../components/RecordCard";
import Unauthorized from "../../components/Unauthorized";
import RecordForm from "../../components/RecordForm";

export default function Track() {
  const [copied, setCopied] = React.useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const { isLoading, data } = useQuery(
    "records",
    () => axios.get(`/api/record/get`),
    { retry: 2 }
  );

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return <Unauthorized />;
  }

  return (
    <Layout>
      <div className="flex flex-col w-full space-y-8">
        <div className="w-full flex justify-between">
          <h1
            onClick={() => router.push("/")}
            className="text-4xl font-semibold text-blue-500 cursor-pointer"
          >
            TwoWeeks
          </h1>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 transition-colors text-white font-semibold rounded-md w-max focus:outline-none"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <h2 className="text-gray-800 font-medium">Patient Name</h2>
          <div className="w-full flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-start lg:items-center justify-between">
            <h1 className="text-gray-800 font-semibold text-3xl lg:text-3xl">
              {session.user?.name}
            </h1>
            <CopyToClipboard
              text={`${
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/track/${session.user.uid}`
                  : `http://twoweeks.co.in/track/${session.user.uid}`
              }`}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 transition-colors text-white font-semibold rounded-md w-max focus:outline-none">
                {copied ? "Copied to Clipboard" : "Share Record"}
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-gray-800 text-xl lg:text-2xl font-semibold">
            Add record
          </p>
          <RecordForm />
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
            Your Records
          </h1>
          {isLoading ? (
            <Skeleton width="100%" height="60px" />
          ) : data?.data.records.length > 0 ? (
            <ul className="flex flex-col space-y-8">
              {data?.data.records.map((record, i) => (
                <RecordCard key={i} {...record} canDelete={true} />
              ))}
            </ul>
          ) : (
            <div className="w-full flex items-center">
              <h1 className="text-gray-800">No records to show.</h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
