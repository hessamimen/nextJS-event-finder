import Layout from "../components/layout/layout";
import MainHeader from "../components/layout/main-header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
