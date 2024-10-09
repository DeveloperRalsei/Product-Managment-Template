import { UserTable } from "@/components/UserTable";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { User } from "@/lib/definitions";
import { withAuth } from "@/lib/withAuth";
import {
  ActionIcon,
  Button,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getServerSideProps = withAuth();

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      nprogress.start();
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("An error occurred while fetching data");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        nprogress.complete();
      }
    }
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Stack>
        <Group w={"100%"} align={"center"}>
          <Title order={3} visibleFrom="xs">
            Users
          </Title>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ flexGrow: 1 }}
          />
          <Button
            component={Link}
            href={"/dashboard/users/create"}
            rightSection={<IconPlus />}
            children={"Add User"}
          />
        </Group>
        <UserTable users={filteredUsers} />
      </Stack>
    </DashboardLayout>
  );
}
