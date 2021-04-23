import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Privacy() {
    const router = useRouter();
  return (
    <Layout>
      <div className="w-full flex flex-col space-y-8">
        <h1
          onClick={() => router.push("/")}
          className="text-4xl font-semibold text-blue-500 cursor-pointer"
        >
          TwoWeeks
        </h1>
        <h2 className="text-gray-800 font-semibold text-3xl lg:text-3xl">
          Privacy Policy
        </h2>
        <p className="text-gray-800 font-medium">
          We only collect the minimum information required for OAuth
          authetication, which include your name and email address.
        </p>
      </div>
    </Layout>
  );
}
