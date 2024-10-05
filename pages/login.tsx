import {
  Alert,
  Button,
  DEFAULT_THEME,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { nprogress } from "@mantine/nprogress";
import { IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 4 ? "Password must be at least 4 characters" : null,
    },
  });

  function handleForm(values: any) {
    nprogress.start();
    console.log(values);
    setError("")

    const bodyParams = new URLSearchParams();
    bodyParams.append("email", values.email);
    bodyParams.append("password", values.password);

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyParams.toString(),
    })
      .then((response) => {
        if (process.env.NODE_ENV === "development") {
          console.log(response, bodyParams.toString());
        }

        nprogress.complete();

        if (!response.ok) {
          setError("Login failed : " + response.statusText);
          return;
        }

        router.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        setError("Login failed : " + error.message);
      });
  }

  return (
    <Stack
      w={"100%"}
      h={"100vh"}
      align={"center"}
      justify={"center"}
      pos={"relative"}>
      {error && (
        <Alert pos={"absolute"} top={10} color="red" icon={<IconAlertCircle />}>
          {error}
        </Alert>
      )}
      <Title order={2}>Login</Title>
      <Paper bg={DEFAULT_THEME.colors.gray[9]} p={"md"}>
        <form onSubmit={form.onSubmit((values) => handleForm(values))}>
          <Stack gap={"sm"}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...form.getInputProps("email")}
              required
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
              required
            />
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
