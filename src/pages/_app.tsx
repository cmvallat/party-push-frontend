import "@/styles/globals.css";
import "bulma/css/bulma.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Dispatch } from "react";
import type { AppProps } from "next/app";

interface AuthenticationData {
  username: string;
}

interface GuestData {
  guestName: string;
  partyCode: string;
  partyName: string;
}

interface HostData {
  inviteOnly: number;
  partyCode: string;
}

export interface IPageProps {
  authenticationData: AuthenticationData;
  guestData: GuestData;
  hostData: HostData;
  setAuthenticationData: Dispatch<AuthenticationData>;
  setGuestData: Dispatch<GuestData>;
  setHostData: Dispatch<HostData>;
}

export default function App({ Component, pageProps }: AppProps) {
  const [authenticationData, setAuthenticationData] = useState({
    token: "",
  })

  const [guestData, setGuestData] = useState({
    guestName: "",
    partyCode: "",
    partyName: "",
  });

  const [hostData, setHostData] = useState({
    inviteOnly: 0,
    partyCode: "",
  });

  return (
    <>
      <Component
        {...pageProps}
        authenticationData={authenticationData}
        guestData={guestData}
        hostData={hostData}
        setAuthenticationData={setAuthenticationData}
        setGuestData={setGuestData}
        setHostData={setHostData}
      />
      <ToastContainer />
    </>
  );
}
