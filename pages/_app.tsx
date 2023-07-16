import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/Layout";
import { SplitwiseContextProvider } from "../contexts/splitwiseContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>( ❛ ͜ʖ ❛ )</title>
      </Head>
      <SplitwiseContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SplitwiseContextProvider>
    </>
  );
}
