import "@/styles/globals.css";
import "bulma/css/bulma.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Dispatch } from "react";
import type { AppProps } from "next/app";

interface GuestData {
  guestName: string;
  partyCode: string;
}

interface HostData {
  inviteOnly: number;
  partyCode: string;
}

export interface IPageProps {
  guestData: GuestData;
  hostData: HostData;
  setGuestData: Dispatch<GuestData>;
  setHostData: Dispatch<HostData>;
}

export default function App({ Component, pageProps }: AppProps) {
  const [guestData, setGuestData] = useState({
    guestName: "",
    partyCode: "",
  });

  const [hostData, setHostData] = useState({
    inviteOnly: 0,
    partyCode: "",
  });

  return (
    <>
      <Component
        {...pageProps}
        guestData={guestData}
        hostData={hostData}
        setGuestData={setGuestData}
        setHostData={setHostData}
      />
      <ToastContainer />
    </>
  );
}
