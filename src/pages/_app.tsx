import '@/styles/globals.css'
import "bulma/css/bulma.css";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
