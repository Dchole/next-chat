import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import { Button, FormControl, Input, Sheet, Stack } from "@mui/joy";

const ChatInputs = () => {
  return (
    <Sheet sx={{ width: "100%" }}>
      <Stack component="form" id="chat-inputs" direction="row" px={1} py={1.25}>
        <Button variant="plain" color="neutral" sx={{ px: 1.2 }}>
          <EmojiEmotionsOutlined />
        </Button>
        <Button variant="plain" color="neutral" sx={{ px: 1.2 }}>
          <AttachFile />
        </Button>
        <FormControl id="chat-message" sx={{ flex: 1, mx: 1, width: "50%" }}>
          <Input type="text" variant="soft" placeholder="Type a message" />
        </FormControl>
        <Button variant="plain" color="neutral" sx={{ px: 1.2 }}>
          <Mic />
        </Button>
      </Stack>
    </Sheet>
  );
};

export default ChatInputs;
