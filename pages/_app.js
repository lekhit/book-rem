import '../styles/globals.css';
import NavBar from '../components/navBar';
import NextProgress from "next-progress";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <div styles={{backGround:"#FF5733"}}>
      <NextProgress delay={300} options={{ showSpinner: false}} />
      </div>
      <Component {...pageProps}></Component>
    </>
  );
}

export default MyApp;
