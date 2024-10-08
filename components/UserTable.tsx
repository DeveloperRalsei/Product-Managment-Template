import { User } from "@/lib/definitions";
import { ActionIcon, Badge, Group, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

export function UserTable({ users }: { users: User[] }) {
  const data = users.map((user, index) => (
    <Table.Tr key={user.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        {user.role === "admin" ? (
          <Badge color="red" variant="light">
            Admin
          </Badge>
        ) : user.role === "mod" ? (
          <Badge color="blue" variant="light">
            Moderator
          </Badge>
        ) : (
          <Badge color="green" variant="light">
            User
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon component={Link} href={`/dashboard/users/${user.id}`}>
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            color="red"
            component={Link}
            href={`/dashboard/users/delete/${user.id}`}>
            <IconTrash />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={"100%"}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={0}>#</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th w={0}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{data}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
