import { useState } from "react";

import Wallet from "../components/wallet/Wallet";
import Header from "../components/Header";
// import { ToastContainer } from "react-toastify";
// import PageLoading from "../components/PageLoading";

import "../styles/globals.css"

function StakingApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  return (
    <Wallet>
      <Header />
      <Component
        {...pageProps}
        startLoading={() => setLoading(true)}
        closeLoading={() => setLoading(false)}
      />
    </Wallet>
  );
}

export default StakingApp;
