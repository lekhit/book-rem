import '../styles/globals.css';
import {AppWrapper} from '../context/notes/state';
import NavBar from '../components/navBar';
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps }) {
  return (
    <>
  
      <NavBar />

      <NextNProgress delay={300} color="#FF5733"/>
<AppWrapper>
      <Component {...pageProps}></Component>
      </AppWrapper>
    </>
  );
}

export default MyApp;
