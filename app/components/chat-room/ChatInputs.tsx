import { WebSocket } from "ws";
import { IMessage, Message } from "@/app/database/schema/Message";
import { IAuthSession } from "@/app/helpers/types";
import { getSession } from "@/app/lib/session";
import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import { Button, FormControl, Sheet, Stack } from "@mui/joy";
import TextInput from "./TextInput";

interface IProps {
  contactId: string;
}

const ChatInputs = ({ contactId }: IProps) => {
  const sendMessage = async (formData: FormData) => {
    "use server";
    const session = getSession<IAuthSession>();
    const message = formData.get("message") as string;

    const createdMessage = await Message.create({
      sender: session?.uid || "", // TODO: This should never be undefined, I'll handle it later
      receiver: contactId,
      message
    });

    Message.emit("created", createdMessage);

    formData.set("message", "");
  };

  return (
    <Sheet sx={{ width: "100%" }}>
      <Stack
        component="form"
        action={sendMessage}
        id="chat-inputs"
        direction="row"
        px={1}
        py={1.25}
      >
        <Button variant="plain" color="neutral" sx={{ px: 1.2 }}>
          <EmojiEmotionsOutlined />
        </Button>
        <Button variant="plain" color="neutral" sx={{ px: 1.2 }}>
          <AttachFile />
        </Button>
        <FormControl id="chat-message" sx={{ flex: 1, mx: 1, width: "50%" }}>
          <TextInput />
        </FormControl>
        <Button variant="plain" color="neutral" sx={{ px: 1.2 }}>
          <Mic />
        </Button>
      </Stack>
    </Sheet>
  );
};

export default ChatInputs;
