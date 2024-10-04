import { Button, DEFAULT_THEME, Paper, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { nprogress } from "@mantine/nprogress";

export default function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? null : "Password must be at least 6 characters",
    },
  });

  async function handleForm(values: any) {
    nprogress.start()
    console.log(values)

    

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      console.log(response)
    } catch (error) {
      nprogress.complete()
      console.error(error)
    }
  }

  return (
    <Stack w={"100%"} h={"100vh"} align={"center"} justify={"center"}>
      <Title order={2}>Login</Title>
      <Paper bg={DEFAULT_THEME.colors.gray[9]} p={"md"}>
        <form onSubmit={form.onSubmit((values) => handleForm(values))}>
          <Stack gap={"sm"}>
            <TextInput label="Email" placeholder="Enter your email" {...form.getInputProps("email")} required/>
            <TextInput
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
