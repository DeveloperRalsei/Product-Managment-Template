import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { NavigationProgress } from "@mantine/nprogress";
import { MainLayout } from "@/layouts/mainLayout";
import { ModalsProvider } from "@mantine/modals";
import { UserProvider } from "@/contexts/userContext";
import { withAuth } from "@/lib/withAuth";
import { GetServerSideProps } from "next";

export const theme = createTheme({
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
    Group: {
      defaultProps: { wrap: "nowrap" },
    },
    Tooltip: {
      defaultProps: { color: "dark" },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>
        <NavigationProgress />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
