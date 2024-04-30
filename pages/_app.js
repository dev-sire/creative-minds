import Layout from "@/components/Layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
        <ToastContainer limit={1} />
        <Component {...pageProps} />
    </Layout>
  );
}
