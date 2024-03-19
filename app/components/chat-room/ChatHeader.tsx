import { Call, Search, VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonGroup,
  Sheet,
  Stack,
  Typography
} from "@mui/joy";
import BackButton from "../back-button";
import { getContact } from "@/app/database/queries/contacts";

interface IProps {
  contactId: string;
}

const ChatHeader = async ({ contactId }: IProps) => {
  const contact = await getContact(contactId);

  return (
    <Sheet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={1}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <BackButton />
          <Avatar size="lg" src={contact?.avatar} alt="" />
          <Typography level="title-sm">{contact?.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={1} py={1}>
          <ButtonGroup variant="soft">
            <Button sx={{ px: 1 }}>
              <VideoCall />
            </Button>
            <Button sx={{ px: 1 }}>
              <Call />
            </Button>
          </ButtonGroup>
          <Button variant="plain" color="neutral" sx={{ px: 1 }}>
            <Search />
          </Button>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default ChatHeader;
