import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

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
