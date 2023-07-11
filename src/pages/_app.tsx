import '@/styles/globals.css'
import "bulma/css/bulma.css";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Dispatch } from 'react';
import type { AppProps } from 'next/app'

export interface IPageProps {
  guestData: {
    guestName: string,
    partyCode: string,
  },
  setGuestData: Dispatch<any>,
  hostData: {
    inviteOnly: number, 
    partyCode: string,
  },
  setHostData: Dispatch<any>,
}

export default function App({ Component, pageProps }: AppProps) {
  const [guestData, setGuestData] = useState({
    guestName: "",
    partyCode: "",
    partyName: "",
  })

  const [hostData, setHostData] = useState({
    inviteOnly: 0,
    partyCode: "",
    partyName: "",
  })

  return(<>
    <Component {...pageProps} 
      guestData={guestData} 
      setGuestData={setGuestData} 
      hostData={hostData}
      setHostData={setHostData}
    />
    <ToastContainer />
  </>)
}
