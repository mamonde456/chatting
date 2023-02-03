import Layout from "../components/common/Layout";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
  );
}
