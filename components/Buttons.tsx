import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconDeviceDesktop, IconLogout, IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useFullscreen } from "@mantine/hooks";
import { theme } from "@/pages/_app";
import { nprogress } from "@mantine/nprogress";
import router from "next/router";

export function FullScreenButton() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <ActionIcon onClick={toggle} color={fullscreen ? theme.primaryColor : "gray"}>
      <IconDeviceDesktop size={30} />
    </ActionIcon>
  );
}

export function LogoutButton() {
  return (
    <ActionIcon
      color={"red"}
      onClick={async () => {
        nprogress.start();
        fetch("/api/users/logout", {
          method: "POST",
        }).then((response) => {
          nprogress.complete();
          if (!response.ok) {
            return;
          }
          router.push("/login");
        });
      }}>
      <IconLogout />
    </ActionIcon>
  );
}

export function ColorSchemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      color={colorScheme === "dark" ? "yellow" : "blue"}>
      {colorScheme === "dark" ? <IconSunFilled /> : <IconMoonFilled />}
    </ActionIcon>
  );
}