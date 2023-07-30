import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
