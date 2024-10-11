import {
  ActionIcon,
  AppShell,
  Burger,
  Container,
  Group,
  NavLink,
  Stack,
  Title,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandMantine,
  IconHomeFilled,
  IconAddressBook,
  IconAdjustmentsAlt,
  IconUsersGroup,
  IconMenuOrder,
  IconChevronRight,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ColorSchemeToggler,
  FullScreenButton,
  UserMenu,
} from "@/components/Buttons";
import { withAuth } from "@/lib/withAuth";
import { User } from "@/lib/definitions";
import { useRouter } from "next/router";

export const getServerSideProps = withAuth();

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpen, { toggle }] = useDisclosure();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/whoami");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        useRouter().push("/login");
      }
    }

    fetchUser();
  }, []);

  const NavLinks = [
    {
      label: "Home",
      href: "/",
      icon: <IconHomeFilled />,
      isAccessable: user?.role === "admin" ? true : false,
    },
    {
      label: "Products",
      href: "/products",
      icon: <IconAddressBook />,
      isAccessable: user?.role === "admin" ? true : false,
    },
    {
      label: "Users",
      href: "/users",
      icon: <IconUsersGroup />,
      isAccessable: user?.role === "admin" ? true : false,
    },
    {
      label: "Orders",
      href: "/orders",
      icon: <IconMenuOrder />,
      isAccessable: user?.role === "admin" ? true : false,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconAdjustmentsAlt />,
      isAccessable: user?.role === "admin" ? true : false,
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 60,
        breakpoint: "sm",
        collapsed: { desktop: false, mobile: !navbarOpen },
      }}>
      <AppShell.Header>
        <Group
          h={"100%"}
          w={"100%"}
          align={"center"}
          justify={"space-between"}
          px={"lg"}>
          <Group align="center">
            <Burger hiddenFrom="sm" onClick={toggle} opened={navbarOpen} />
            <Group>
              <IconBrandMantine size={30} />
              <Title order={4}>Panel</Title>
            </Group>
          </Group>
          <Group>
            <ColorSchemeToggler />
            <FullScreenButton />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack h={"100%"} py={"lg"} align="center">
          <Stack w={"100%"} h={"100%"} align={"center"} visibleFrom="sm">
            {NavLinks.map((link) => (
              <Tooltip
                label={
                  link.isAccessable
                    ? link.label
                    : "Only admins can access in this page"
                }
                key={link.label}
                position="right"
                withArrow>
                <Link 
                style={{display: link.isAccessable ? "inline-block" : "none"}}
                href={`/dashboard${link.href}`}>
                  <ActionIcon disabled={!link.isAccessable} size={"lg"}>
                    {link.icon}
                  </ActionIcon>
                </Link>
              </Tooltip>
            ))}
          </Stack>
          <Stack gap={3} hiddenFrom="sm" w={"100%"} h={"100%"}>
            {NavLinks.map((link) => (
              <NavLink
                component={Link}
                label={link.label}
                href={`/dashboard${link.href}`}
                key={link.label}
                w={"100%"}
                variant="subtle"
                leftSection={link.icon}
                rightSection={
                  <Text size="sm" c="dimmed">
                    <IconChevronRight size={16} />
                  </Text>
                }
              />
            ))}
          </Stack>
          <UserMenu />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container pt={"lg"} size={"lg"}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
