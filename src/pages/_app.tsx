import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "src/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider adapter={NextAdapter}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SkeletonTheme baseColor="#a7ed9f" highlightColor="#a7ced1">
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />;
            </ChakraProvider>
          </SkeletonTheme>
        </Hydrate>
      </QueryClientProvider>
    </QueryParamProvider>
  );
}
