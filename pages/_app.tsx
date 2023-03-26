import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { SplitwiseContextProvider } from "../contexts/splitwiseContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/app-icon.png" />
        <link rel="icon" type="image/x-icon" href="/web-icon.png" />
        <title>( ❛ ͜ʖ ❛ )</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SplitwiseContextProvider>
        <Component {...pageProps} />
      </SplitwiseContextProvider>
    </>
  );
}
