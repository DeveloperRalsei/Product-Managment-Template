import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { MainLayout } from "@/layouts/main";

const theme = createTheme({
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  components: {
    ActionIcon: {
      defaultProps: { variant: "light" },
    },
    Button: {
      defaultProps: { variant: "light" },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
