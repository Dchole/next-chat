import { Stack, Typography } from "@mui/joy";

export default function Home() {
  return (
    <Stack
      height="100vh"
      width="100%"
      bgcolor="whitesmoke"
      alignItems="center"
      justifyContent="center"
    >
      <Typography level="title-lg">Welcome to Next Chat</Typography>
      <Typography level="body-sm">
        Click on any of the contacts to start a conversation
      </Typography>
    </Stack>
  );
}
