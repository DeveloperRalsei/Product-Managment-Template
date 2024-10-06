import { MainLayout } from "@/layouts/mainLayout";
import { User } from "@/lib/definitions";
import {
  Alert,
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { nprogress } from "@mantine/nprogress";
import { IconAlertCircleFilled, IconKeyFilled, IconMailFilled, IconTextCaption, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUser() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "2"
    },

    validateInputOnChange: true,
    validate: {
      name: (value) =>
        value.length < 2 ? "Name too short" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 4 ? "Password must be at least 4 characters" : null,
    },
  });

  async function handleSubmit(values: Omit<User, "id">) {
    nprogress.start();

    
    try {
      const payload = {
        ...values,
        role: Number(values.role)
      }
      const response = await fetch("/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setError("An error occurred while adding user");
        throw new Error("An error occurred while adding user");
      }

      router.push("/dashboard/users");
    } catch (error) {
      setError("An error occurred while adding user: " + error);
      console.error(error);
    } finally {
      nprogress.complete();
    }
  }

  return (
    <MainLayout>
      <Stack>
        <Group w={"100%"}>
          <Title order={2} mb={"md"}>
            New User
          </Title>
          {error && (
            <Alert
              display="flex"
              style={{ flexGrow: 1 }}
              p="sm"
              color="red"
              icon={<IconAlertCircleFilled />}>
              This is a new user
            </Alert>
          )}
        </Group>

        <form
          onSubmit={form.onSubmit((values) =>
            handleSubmit({...values, role: Number(values.role) as (0 | 1 | 2)})
          )}>
          <Stack>
            <TextInput
              label="Name"
              leftSection={<IconTextCaption/>}
              placeholder="User Name"
              {...form.getInputProps("name")}
              required
            />
            <TextInput
              label="Email"
              leftSection={<IconMailFilled/>}
              placeholder="Enter user email"
              type="email"
              {...form.getInputProps("email")}
              required
            />
            <TextInput
              label="Name"
              leftSection={<IconKeyFilled/>}
              placeholder="User Password"
              type="password"
              {...form.getInputProps("password")}
              required
            />
            <Select
              label="Role"
              description={"Warning: Admin role has access to all features in the system"}
              leftSection={<IconUser />}
              placeholder="Select Role"
              data={[
                { label: "Admin", value: "2" },
                { label: "Mod", value: "1" },
                { label: "User", value: "0" },
              ]}
              {...form.getInputProps("role")}
            />
          </Stack>
          <Button type="submit" mt={"md"}>
            Create
          </Button>
        </form>
      </Stack>
    </MainLayout>
  );
}
