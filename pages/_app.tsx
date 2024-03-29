import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { SplitwiseContextProvider } from "../contexts/splitwiseContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>( ❛ ͜ʖ ❛ )</title>
      </Head>
      <SplitwiseContextProvider>
        <Component {...pageProps} />
      </SplitwiseContextProvider>
    </>
  );
}
