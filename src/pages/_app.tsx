import '@/styles/globals.css'
import "bulma/css/bulma.css";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Dispatch } from 'react';
import type { AppProps } from 'next/app'

export interface IPageProps {
  data: {
    inviteOnly: number, 
    partyCode: string,
  },
  setData: Dispatch<any>,
}

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState({
    inviteOnly: 0,
    partyCode: "",
  })

  return(<>
    <Component {...pageProps} data={data} setData={setData} />
    <ToastContainer />
  </>)
}
