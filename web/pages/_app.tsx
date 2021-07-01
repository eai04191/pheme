import "../styles/tailwind.css";
import "../styles/globals.css";
import "../styles/tailwind-util.css";
import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import useSWR, { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
