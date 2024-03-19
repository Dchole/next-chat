import { Stack, Typography } from "@mui/joy";
import { getSession } from "./lib/session";
import LoginButton from "./components/login/LoginButton";

export default function Home() {
  const session = getSession();

  return (
    <Stack
      height="100vh"
      width="100%"
      bgcolor="whitesmoke"
      alignItems="center"
      justifyContent="center"
    >
      <Typography level="title-lg">Welcome to Next Chat</Typography>
      {session ? (
        <Typography level="body-md">
          Click on a contact to start a conversation
        </Typography>
      ) : (
        <LoginButton />
      )}
    </Stack>
  );
}
