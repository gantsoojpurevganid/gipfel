import { Html, Head, Main, NextScript } from "next/document";
import { GlobalProvider } from "./GlobalProvider";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/svg/logo/gipfel.svg" sizes="64x64" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
