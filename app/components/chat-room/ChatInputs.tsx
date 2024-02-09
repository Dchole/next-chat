import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import { Button, FormControl, Input, Sheet, Stack } from "@mui/joy";

const ChatInputs = () => {
  return (
    <Sheet>
      <Stack component="form" id="chat-inputs" direction="row" px={1} py={1.25}>
        <Button variant="plain" color="neutral">
          <EmojiEmotionsOutlined />
        </Button>
        <Button variant="plain" color="neutral">
          <AttachFile />
        </Button>
        <FormControl id="chat-message" sx={{ flex: 1, mx: 1 }}>
          <Input type="text" variant="soft" placeholder="Type a message" />
        </FormControl>
        <Button variant="plain" color="neutral">
          <Mic />
        </Button>
      </Stack>
    </Sheet>
  );
};

export default ChatInputs;
