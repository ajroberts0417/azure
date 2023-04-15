import { getAccount } from '@/services/getAccount'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Provider } from "react-redux";

import store from "@/state/store";

export default function App({ Component, pageProps }: AppProps) {

  const { push } = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
      getAccount().then((account) => {
        if (!account) return push("/");
      }).finally(() => {
        setLoading(false)
      })
  }, [push, setLoading])

  console.log(loading)

  return loading ? (
    <></>
  ) : (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
