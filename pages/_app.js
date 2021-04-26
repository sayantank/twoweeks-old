import { Provider } from "next-auth/client";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <QueryClientProvider client={queryClient}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <NextSeo
          title="TwoWeeks"
          description="A recovery tracker for COVID-19 patients at home."
          twitter={{
            handle: "@sayantank",
            site: "@sayantank",
          }}
          openGraph={{
            type: "website",
            url: "https://twoweeks.co.in",
            title: "TwoWeeks",
            description: "A recovery tracker for COVID-19 patients at home.",
            images: [
              {
                url:
                  "https://res.cloudinary.com/sayantank/image/upload/v1619190974/banner_jvmnbu.png",
                width: 1600,
                height: 1200,
                alt: "Og Image Alt",
              },
            ],
          }}
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}
