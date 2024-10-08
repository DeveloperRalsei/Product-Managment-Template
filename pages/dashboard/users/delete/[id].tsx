import { MainLayout } from "@/layouts/mainLayout";
import { User } from "@/lib/definitions";
import { Alert, Button, Group, Stack, Text } from "@mantine/core";
import { nprogress } from "@mantine/nprogress";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const token = req.cookies.userToken || null;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
};

export default function DeleteUser({ token }: { token: string }) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      nprogress.start();
      try {
        const response = await fetch(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Something went wrong while fetching user");
          throw new Error("Something went wrong while fetching user");
        }

        const user = await response.json();
        setUser(user);
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      } finally {
        nprogress.complete();
      }
    }

    fetchUser();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    nprogress.start();
    event.preventDefault();

    try {
      const response = await fetch(`/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: user!.id
        }),
      });

      if (!response.ok) {
        setError("Something went wrong while deleting user");
        throw new Error("Something went wrong while deleting user");
      }

      
    } catch (error: any) {
      setError(error.message);
      console.error("" + error);
    } finally {
      nprogress.complete();
    }
  }

  return (
    <MainLayout>
      <form onSubmit={handleSubmit}>
        <Stack>
          {error && <Alert color="red">{error}</Alert>}

          <Group fz={20}>
            Are you sure you want to delete this user?{" "}
            <Text fz={20} c={"red"}>
              {user?.name}
            </Text>
          </Group>

          <Group>
            <Button
              component={Link}
              href={"/dashboard/users"}
              variant="default">
              No
            </Button>
            <Button color="red" type="submit">
              Yes
            </Button>
          </Group>
        </Stack>
      </form>
    </MainLayout>
  );
}
