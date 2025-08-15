import '../styles/global.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
// This file is the custom App component for Next.js, which allows you to override the
//  default App behavior and add global styles or layout components.