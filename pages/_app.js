import Home from "./index";
import "../styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokémon Battle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home>
        <Component {...pageProps} />
      </Home>
    </>
  );
}
