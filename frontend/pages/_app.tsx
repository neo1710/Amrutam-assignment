import { Provider } from "react-redux";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} /></Provider>
  );
}

// This file is the custom App component for Next.js, which allows you to override the
//  default App behavior and add global styles or layout components.