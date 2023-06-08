import { useState } from "react";

import Wallet from "../components/wallet/Wallet";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
// import PageLoading from "../components/PageLoading";

import "../styles/globals.css";
import { BalanceProvider } from "../../context/BalanceContext";

function SimpleJackpot({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  return (
    <Wallet>
      <BalanceProvider>
        <Header />
        <Component
          {...pageProps}
          startLoading={() => setLoading(true)}
          closeLoading={() => setLoading(false)}
        />
        <ToastContainer style={{ fontSize: 14 }} />
      </BalanceProvider>
    </Wallet>
  );
}

export default SimpleJackpot;
