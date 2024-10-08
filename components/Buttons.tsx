import {
  ActionIcon,
  Avatar,
  Grid,
  Loader,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconDeviceDesktop,
  IconLogout,
  IconMoonFilled,
  IconSunFilled,
  IconTrash,
  IconUserFilled,
} from "@tabler/icons-react";
import { useFullscreen } from "@mantine/hooks";
import { theme } from "@/pages/_app";
import { nprogress } from "@mantine/nprogress";
import { openConfirmModal } from "@mantine/modals";
import router from "next/router";
import { User } from "@/lib/definitions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserContext } from '@/contexts/userContext'

export function FullScreenButton() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <ActionIcon
      onClick={toggle}
      color={fullscreen ? theme.primaryColor : "gray"}>
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

export function UserMenu() {
  const user = React.useContext(UserContext);

  const errorStyle = {
    color:"red"
  }

  return (
    <Menu position="right-start">
      <Menu.Target>
        <ActionIcon size="lg">
          <IconUserFilled />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown p={"md"}>
        <Grid>
          <Grid.Col span={3}>
            <Avatar />
          </Grid.Col>
          <Grid.Col>
            {}
          </Grid.Col>
        </Grid>
        <Menu.Divider />
        test
      </Menu.Dropdown>
    </Menu>
  );
}
