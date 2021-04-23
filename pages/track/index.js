import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/client";
import { toast } from "react-toastify";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ErrorMsg from "../../components/ErrorMsg";
import FormInput from "../../components/FormInput";
import Layout from "../../components/Layout";
import RadioButton from "../../components/RadioButton";
import React from "react";
import RecordCard from "../../components/RecordCard";

export default function Track() {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
  const [session, loading] = useSession();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("records", () =>
    axios.get(`/api/record/get`)
  );

  const mutation = useMutation(
    (credentials) => {
      return axios.post("/api/record/add", { data: credentials });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("records");
        toast.success("Successfully added record.");
      },
      onError: () => {
        toast.error("Error occured. Contact us.");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitRecord = async (credentials) => {
    try {
      credentials.temp = Number(credentials.temp);
      credentials.smell = credentials.smell === "true" ? true : false;
      credentials.taste = credentials.taste === "true" ? true : false;
    } catch (e) {
      return toast.error("Form error. Contact me on Twitter.");
    }

    try {
      mutation.mutate(credentials);
      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <Layout>
        <h1>Unauthorized</h1>
      </Layout>
    );
  }

  if (isLoading)
    return (
      <Layout>
        <h1 className="text-blue-500 text-xl font-medium">Loading</h1>
      </Layout>
    );
  else
    return (
      <Layout>
        <div className="flex flex-col w-full space-y-8">
          <div className="w-full flex justify-between">
            <h1 className="text-4xl font-semibold text-green-400">TwoWeeks</h1>
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
                    : `http://twoweeks.vercel.app/track/${session.user.uid}`
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
            <form
              onSubmit={handleSubmit(submitRecord)}
              className="flex flex-col space-y-4 w-full p-4 rounded-md border-2 border-gray-200"
            >
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6">
                <div className="flex lg:flex-1 flex-col space-y-1">
                  <FormInput
                    {...register("temp", {
                      required: "This field is required.",
                      pattern: {
                        value: new RegExp("^(\\d{1,3}|\\d{0,3}\\.\\d{1,2})$"),
                        message: "Invalid Temperature",
                      },
                    })}
                    name="temp"
                    title="Temperature"
                    type="text"
                    placeholder="Fahrenheit"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="temp"
                    render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
                  />
                </div>
                <div className="flex lg:flex-1 flex-col space-y-1">
                  <FormInput
                    {...register("oxygen", {
                      required: "This field is required.",
                      min: {
                        value: 0,
                        message: "SpO2 level should be between 0-100",
                      },
                      max: {
                        value: 100,
                        message: "SpO2 level should be between 0-100",
                      },
                      valueAsNumber: true,
                    })}
                    name="oxygen"
                    title="SpO2 Levels (Oxygen)"
                    type="number"
                    placeholder="Sp02 percentage"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="oxygen"
                    render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-8">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-800 font-medium">
                    Sense of <span className="underline font-bold">Smell</span>
                  </p>
                  <div className="flex items-center space-x-4">
                    <RadioButton
                      {...register("smell", {
                        required: "This field is required",
                      })}
                      text="Yes"
                      name="smell"
                      value={true}
                    />
                    <RadioButton
                      {...register("smell", {
                        required: "This field is required",
                      })}
                      text="No"
                      name="smell"
                      value={false}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="smell"
                    render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-800 font-medium">
                    Sense of <span className="underline font-bold">Taste</span>
                  </p>
                  <div className="flex items-center space-x-4">
                    <RadioButton
                      {...register("taste", {
                        required: "This field is required.",
                      })}
                      text="Yes"
                      name="taste"
                      value={true}
                    />
                    <RadioButton
                      {...register("taste", {
                        required: "This field is required.",
                      })}
                      text="No"
                      name="taste"
                      value={false}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="taste"
                    render={({ message }) => <ErrorMsg>{message}</ErrorMsg>}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-400 hover:bg-green-500 transition-colors px-4 py-2 rounded-md text-white font-bold focus:outline-none"
              >
                Add record
              </button>
            </form>
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
              Your Records
            </h1>
            {!isLoading && data?.data.data.length > 0 ? (
              <ul className="flex flex-col space-y-8">
                {data?.data.data.map((record, i) => (
                  <RecordCard key={i} {...record} canDelete={true} />
                ))}
              </ul>
            ) : (
              <h1>no records</h1>
            )}
          </div>
        </div>
      </Layout>
    );
}
