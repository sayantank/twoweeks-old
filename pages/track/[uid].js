import { connectToDatabase } from "../../util/mongo";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";

import RecordCard from "../../components/RecordCard";
import Layout from "../../components/Layout";
import React from "react";

export default function TrackUser({ records, user }) {
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
        <div className="flex flex-col space-y-2">
          <h2 className="text-gray-800 font-medium">Patient Name</h2>
          <h1 className="text-gray-800 font-semibold text-3xl lg:text-3xl">
            {user.name}
          </h1>
        </div>
        <ul className="flex flex-col space-y-4">
          {records.map((record, i) => (
            <RecordCard key={i} {...record} canDelete={false} />
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const { uid } = context.params;
    const { db } = await connectToDatabase();
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(uid) }, { projection: { _id: 1, name: 1 } });

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/invalid",
        },
      };
    }
    user._id = user._id.toString();
    const recordDocs = await db
      .collection("records")
      .find({ user_id: ObjectId(uid) }, { projection: { _id: 0, user_id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    const records = recordDocs.map((doc) =>
      Object.assign(
        {},
        {
          temp: doc.temp,
          oxygen: doc.oxygen,
          smell: doc.smell,
          taste: doc.taste,
          createdAt: doc.createdAt.toString(),
        }
      )
    );

    return {
      props: { records, user }, // will be passed to the page component as props
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/invalid",
      },
    };
  }
}

// export async function getStaticPaths() {
//   const { db } = await connectToDatabase();
//   const cursor = await db
//     .collection("users")
//     .find({}, { projection: { _id: 1, name: 1 } });
//   const pathArray = [];
//   if (cursor.count() === 0) {
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }

//   await cursor.forEach((doc) => {
//     pathArray.push({ params: { uid: doc._id.toString() } });
//   });

//   return {
//     paths: pathArray,
//     fallback: false, // See the "fallback" section below
//   };
// }
