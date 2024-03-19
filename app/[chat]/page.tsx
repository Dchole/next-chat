import { Stack } from "@mui/joy";
import ChatHeader from "../components/chat-room/ChatHeader";
import ChatMessages from "../components/chat-room/ChatMessages";
import ChatInputs from "../components/chat-room/ChatInputs";

const Chat = ({ params }: { params: { chat: string } }) => {
  const { chat } = params;

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
        zIndex: 100,

        "@media(min-width: 900px)": {
          position: "relative"
        }
      }}
    >
      <ChatHeader contactId={chat} />
      <ChatMessages />
      <ChatInputs />
    </Stack>
  );
};

export default Chat;
