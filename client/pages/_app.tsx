import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "tw-elements/dist/css/tw-elements.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
