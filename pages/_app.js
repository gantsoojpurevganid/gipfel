import "@/styles/globals.css";
import { GlobalProvider } from "./GlobalProvider";
import Head from "next/head";
import { AuthProvider } from "@/context/auth";

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>GIPFEL</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalProvider>
  );
}
