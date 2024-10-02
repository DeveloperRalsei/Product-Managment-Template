import { ColorSchemeToggler } from "@/components/ColorSchemeToggler";
import { AppShell, Burger, Container, Flex, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMantine } from "@tabler/icons-react";
import React from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [navbarOpen, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
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

      <AppShell.Navbar></AppShell.Navbar>

      <AppShell.Main>
        <Container pt={"lg"} size={"lg"}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
