import { Box, Stack, Typography } from "@mui/joy";
import ChatHeader from "./ChatHeader";
import ChatInputs from "./ChatInputs";
import ChatMessages from "./ChatMessages";

const ChatRoom = () => {
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

  //   return (
  //     <Stack component="section" id="chat-room" width="100%">
  //       <ChatHeader />
  //       <ChatMessages />
  //       <ChatInputs />
  //     </Stack>
  //   );
};

export default ChatRoom;
