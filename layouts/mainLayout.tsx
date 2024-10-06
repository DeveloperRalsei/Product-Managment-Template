import { theme } from "@/pages/_app";
import {
  ActionIcon,
  AppShell,
  Burger,
  Container,
  Flex,
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
  IconLogout,
  IconChevronRight,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import { nprogress } from "@mantine/nprogress";
import { useRouter } from "next/navigation";
import { LogoutButton, ColorSchemeToggler, FullScreenButton } from "@/components/Buttons";

const NavLinks = [
  { label: "Home", href: "/", icon: <IconHomeFilled /> },
  { label: "Products", href: "/products", icon: <IconAddressBook /> },
  { label: "Users", href: "/users", icon: <IconUsersGroup /> },
  { label: "Orders", href: "/orders", icon: <IconMenuOrder /> },
  { label: "Settings", href: "/settings", icon: <IconAdjustmentsAlt /> },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.userToken || "";

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpen, { toggle }] = useDisclosure();

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
            <FullScreenButton/>
            <LogoutButton/>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack h={"100%"} py={"lg"} align="center">
          <Stack w={"100%"} h={"100%"} align={"center"} visibleFrom="sm">
            {NavLinks.map((link) => (
              <Tooltip
                label={link.label}
                key={link.label}
                position="right"
                withArrow>
                <Link href={`/dashboard${link.href}`}>
                  <ActionIcon size={"lg"}>{link.icon}</ActionIcon>
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
                    <IconChevronRight size={16}/>
                  </Text>
                }
              />
            ))}
          </Stack>
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
