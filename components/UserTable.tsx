import { User } from "@/lib/definitions";
import { ActionIcon, Badge, Group, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

export function UserTable({ users }: { users: User[] }) {
  console.log(users);
  const data = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        {user.role === 2 ? (
          <Badge color="red">Admin</Badge>
        ) : user.role === 1 ? (
          <Badge color="green">User</Badge>
        ) : (
          <Badge color="blue">Moderator</Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon component={Link} href={`/dashboard/users/${user.id}`}>
            <IconEdit />
          </ActionIcon>
          <ActionIcon color="red" component={Link} href={`/dashboard/users/delete/${user.id}`}>
            <IconTrash />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={"100%"}>
      <Table striped withColumnBorders highlightOnHover withTableBorder>
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
