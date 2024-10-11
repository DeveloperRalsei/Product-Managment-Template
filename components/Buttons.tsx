import {
  ActionIcon,
  Avatar,
  Badge,
  Grid,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconDeviceDesktop,
  IconExternalLink,
  IconLogout,
  IconMoonFilled,
  IconSunFilled,
  IconTrash,
  IconUserFilled,
} from "@tabler/icons-react";
import { useFullscreen } from "@mantine/hooks";
import { theme } from "@/pages/_app";
import { nprogress } from "@mantine/nprogress";
import router from "next/router";
import { User } from "@/lib/definitions";
import React, { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    name: "Loading...",
    email: "Loading...",
    id: 0,
    role: "user",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/whoami");

        setUser(await response.json());
      } catch (error) {
        console.error(String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <Menu position="right-start">
      <Menu.Target>
        <ActionIcon size="lg">
          {loading ? <Loader size={20} /> : <IconUserFilled />}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown p={"md"}>
        <Stack>
          <Group>
            <Avatar />
            {user.name}
            <Badge
              color={
                user.role === "admin"
                  ? "red"
                  : user.role === "mod"
                  ? "blue"
                  : "green"
              }>
              {user.role}
            </Badge>
          </Group>
          <Text component="a" href={`mailto:${user.email}`} c={"dimmed"} fz={"sm"}> 
            <Group gap={3}>
              {user.email}
              <IconExternalLink size={13} />
            </Group>
          </Text>
        </Stack>
        <Menu.Divider mb={10} />
        <Group w={"100%"} justify="space-between">
          <div></div>
          <Group>
            <LogoutButton />
          </Group>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
}
