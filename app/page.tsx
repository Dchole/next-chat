import { Stack } from "@mui/joy";
import ChatRoom from "./components/chat-room";
import Contacts from "./components/contacts";

export default function Home() {
  return (
    <Stack component="main" id="main-content" height="100vh" direction="row">
      <Contacts />
      <ChatRoom />
    </Stack>
  );
}
