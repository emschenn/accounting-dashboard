import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,500,301,701,300,501,401,901,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/app-icon.png" />
        <link rel="icon" type="image/x-icon" href="/web-icon.png" />
        {/* <title>( ❛ ͜ʖ ❛ )</title> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body className="bg-custom-bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
