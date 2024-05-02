import { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/joy";
import visuallyHidden from "@mui/utils/visuallyHidden";
import StaticMessages from "./StaticMessages";
import LiveMessages from "./LiveMessages";
import MessagesView from "./MessagesView";

interface IProps {
  contactId: string;
}

const ChatMessages = async ({ contactId }: IProps) => {
  return (
    <Box
      flexGrow={1}
      id="messages"
      bgcolor="slategray"
      component="section"
      position="relative"
      overflow="auto"
    >
      <Typography level="h3" sx={visuallyHidden}>
        Messages
      </Typography>
      <Stack
        py={1}
        px={3}
        left={0}
        gap={1}
        minHeight="100%"
        width="100%"
        justifyContent="flex-end"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <StaticMessages contactId={contactId} />
        </Suspense>
        <Suspense fallback={<div />}>
          <LiveMessages>
            {async messages => {
              "use server";

              return <MessagesView messages={messages} />;
            }}
          </LiveMessages>
        </Suspense>
      </Stack>
    </Box>
  );
};

export default ChatMessages;
