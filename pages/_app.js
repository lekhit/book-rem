import '../styles/globals.css';
import Head from 'next/head'
import {AppWrapper} from '../context/notes/state';
import NavBar from '../components/navBar';
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }) {
  return (
    <>
  <Head>

  <meta charset='utf-8' />
<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
<meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
<meta name='description' content='Description' />
<meta name='keywords' content='Keywords' />
<link rel='manifest' href="manifest.json"/>

  </Head>
  <AppWrapper>
      <NavBar />

      <NextNProgress delay={300} color="#FF5733"/>

      <Component {...pageProps}></Component>
      
      </AppWrapper>

    </>
  );
}

export default MyApp;
