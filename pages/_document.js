import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,500,301,701,300,501,401,901,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-custom-bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
