import { Stack } from "@mui/joy";
import ChatHeader from "../components/chat-room/ChatHeader";
import ChatMessages from "../components/chat-room/ChatMessages";
import ChatInputs from "../components/chat-room/ChatInputs";

const Chat = () => {
  return (
    <Stack
      component="section"
      id="chat-room"
      width="100%"
      className="slide_in"
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        zIndex: 100
      }}
    >
      <ChatHeader />
      <ChatMessages />
      <ChatInputs />
    </Stack>
  );
};

export default Chat;
