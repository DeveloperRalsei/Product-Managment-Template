import { DashboardLayout } from "@/layouts/DashboardLayout";
import { User } from "@/lib/definitions";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeletePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queries = router.query;

  const ids = String(queries.id).split(",");

  useEffect(() => {
    function fetchUsers() {
      ids.forEach(async (id) => {
        try {
          const response = await fetch(`/api/users/${id}`);

          const user = await response.json();

          setUsers((prev) => [...prev, user]);
        } catch (error) {
          console.error(String(error));
        } finally {
          setLoading(false);
          console.log(users);
        }
      });
    }

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <LoadingOverlay visible={loading} />
      <h1>Delete Users</h1>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        );
      })}
    </DashboardLayout>
  );
}
