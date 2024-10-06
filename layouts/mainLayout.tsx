import { ColorSchemeToggler } from "@/components/ColorSchemeToggler";
import { theme } from "@/pages/_app";
import {
  ActionIcon,
  AppShell,
  Burger,
  Container,
  Flex,
  Group,
  Stack,
  Title,
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
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import { nprogress } from "@mantine/nprogress";
import { useRouter } from "next/navigation";

const NavLinks = [
  { label: "Home", href: "/", icon: <IconHomeFilled /> },
  { label: "Products", href: "/products", icon: <IconAddressBook /> },
  { label: "users", href: "/users", icon: <IconUsersGroup /> },
  { label: "Orders", href: "/orders", icon: <IconMenuOrder /> },
  { label: "Settings", href: "/settings", icon: <IconAdjustmentsAlt /> },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const token = req.cookies.userToken || ""

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpen, { toggle }] = useDisclosure();
  const [active, setActive] = React.useState(0);
  const router = useRouter()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 60,
        breakpoint: "sm",
        collapsed: { desktop: false, mobile: !navbarOpen },
      }}>
      <AppShell.Header>
        <Flex
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
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack h={"100%"} py={"lg"} align="center">
          <Stack
            w={"100%"}
            h={"100%"}
            align={"center"}
            visibleFrom="sm">
            {NavLinks.map((link, index) => (
              <Tooltip
                label={link.label}
                key={link.label}
                position="right"
                withArrow>
                <Link href={`/dashboard${link.href}`}>
                  <ActionIcon
                    size={"lg"}
                    color={active === index ? "pink" : theme.primaryColor}
                    onClick={() => setActive(index)}>
                    {link.icon}
                  </ActionIcon>
                </Link>
              </Tooltip>
            ))}
          </Stack>
          <Stack>
            <ActionIcon
              size={"lg"}
              color={theme.primaryColor}
              onClick={async () => {
                nprogress.start()
                fetch("/api/users/logout", {
                  method: "POST"
                })
                router.push("/login")
              }}>
                <IconLogout/>
              </ActionIcon>
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
