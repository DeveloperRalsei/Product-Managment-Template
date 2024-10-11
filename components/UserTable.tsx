import { useState } from "react";
import { User } from "@/lib/definitions";
import {
  ActionIcon,
  Badge,
  Group,
  Table,
  Checkbox,
  Button,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserTable({ users }: { users: User[] }) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const sortedUsers = users.sort((a, b) => {
    const roleOrder = ["admin", "mod", "user"];
    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
  });

  const toggleSelectUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    setSelectedUsers([]);
  };

  const data = sortedUsers.map((user, index) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Checkbox
          checked={selectedUsers.includes(user.id)}
          onChange={() => toggleSelectUser(user.id)}
        />
      </Table.Td>
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
            href={`/dashboard/users/delete?id=${user.id}`}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer minWidth={"100%"}>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={0}>
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onChange={() => {
                    if (selectedUsers.length === users.length) {
                      setSelectedUsers([]);
                    } else {
                      setSelectedUsers(users.map((user) => user.id));
                    }
                  }}
                />
              </Table.Th>
              <Table.Th w={0}>#</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th miw={100}>Role</Table.Th>
              <Table.Th w={0}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{data}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {selectedUsers.length > 0 && (
        <Button component={Link} href={`/dashboard/users/delete?id=${selectedUsers.join(",")}`} color="red" onClick={handleDeleteSelected} mt="md">
          Delete Selected
        </Button>
      )}
    </>
  );
}
