import { createEmotionCache, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterTransition } from "components/misc/RouterTransition";
import { pxToEmString } from "lib";
import { queryClient } from "lib/msic/query";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export const emotionCache = createEmotionCache({
  key: "mantine",
  prepend: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        breakpoints: {
          xs: pxToEmString(425),
          sm: pxToEmString(640),
          md: pxToEmString(768),
          lg: pxToEmString(1024),
          xl: pxToEmString(1280),
        },
        black: "#212529",
        colorScheme: "light",
        primaryColor: "cyan",
        primaryShade: 6,
        fontFamily: "Raleway, sans-serif",
        defaultRadius: "sm",
      }}
      emotionCache={emotionCache}
    >
      <QueryClientProvider client={queryClient}>
        <RouterTransition />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default MyApp;
