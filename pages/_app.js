import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";

import { NotificationContexProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContexProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description " content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContexProvider>
  );
}

export default MyApp;
