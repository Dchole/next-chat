import { Call, Search, VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonGroup,
  Sheet,
  Stack,
  Typography
} from "@mui/joy";

const ChatHeader = () => {
  return (
    <Sheet>
      <Stack direction="row" justifyContent="space-between" px={2} py={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar size="lg" />
          <Typography level="title-sm">John Doe</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" spacing={1} py={1}>
          <ButtonGroup variant="soft">
            <Button>
              <VideoCall />
            </Button>
            <Button>
              <Call />
            </Button>
          </ButtonGroup>
          <Button variant="plain" color="neutral">
            <Search />
          </Button>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default ChatHeader;
