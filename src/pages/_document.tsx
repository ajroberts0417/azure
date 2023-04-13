import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-screen font-mono">
      <Head/>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
