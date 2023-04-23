import { getAccount } from '@/services/getAccount'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  const { push } = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
      getAccount().then((account) => {
        if (!account) return push("/login");
      }).finally(() => {
        setLoading(false)
      })
  }, [push, setLoading])

  console.log(loading)

  return loading ? <></> : <Component {...pageProps} />
}
