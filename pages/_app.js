import '../styles/globals.css';
import NavBar from '../components/navBar';
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />

      <NextNProgress delay={300} color="#FF5733"/>

      <Component {...pageProps}></Component>
    </>
  );
}

export default MyApp;
