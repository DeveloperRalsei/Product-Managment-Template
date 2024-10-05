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
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const NavLinks = [
  { label: "Home", href: "/", icon: <IconHomeFilled /> },
  { label: "Products", href: "/products", icon: <IconAddressBook /> },
  { label: "users", href: "/users", icon: <IconUsersGroup /> },
  { label: "Orders", href: "/orders", icon: <IconMenuOrder /> },
  { label: "Settings", href: "/settings", icon: <IconAdjustmentsAlt /> },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpen, { toggle }] = useDisclosure();
  const [active, setActive] = React.useState(0);

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
        <Stack
          w={"100%"}
          h={"100%"}
          align={"center"}
          mt={"sm"}
          visibleFrom="sm">
          {NavLinks.map((link, index) => (
            <Tooltip
              label={link.label}
              key={link.label}
              position="right"
              withArrow>
              <Link href={link.href} >
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
      </AppShell.Navbar>

      <AppShell.Main>
        <Container pt={"lg"} size={"lg"}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
