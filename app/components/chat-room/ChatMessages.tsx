import type { IAuthSession } from "@/app/helpers/types";
import { queryMessages } from "@/app/database/queries/messages";
import { getSession } from "@/app/lib/session";
import { Box, Sheet, Stack, Typography } from "@mui/joy";
import { Visibility } from "@mui/icons-material";
import visuallyHidden from "@mui/utils/visuallyHidden";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

interface IProps {
  contactId: string;
}

const ChatMessages = async ({ contactId }: IProps) => {
  const session = getSession<IAuthSession>();
  const messages = await queryMessages(contactId);

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
        {messages.map(({ _id, sender, message, date, read }) => {
          const sentByMe = sender.toString() === session?.uid;

          return (
            <Stack
              width="fit-content"
              key={_id}
              sx={{
                position: "relative",
                left: sentByMe ? "100%" : "",
                transform: sentByMe ? "translateX(-100%)" : ""
              }}
            >
              <Sheet
                color="primary"
                variant={sentByMe ? "solid" : "soft"}
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 8
                }}
              >
                <Typography
                  level="body-md"
                  variant={sentByMe ? "solid" : "plain"}
                  color={sentByMe ? "primary" : "neutral"}
                >
                  {message}
                </Typography>
              </Sheet>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={sentByMe ? "flex-end" : "flex-start"}
                gap={1}
              >
                {read && sentByMe ? <Visibility fontSize="small" /> : null}
                <Typography
                  py={0.4}
                  level="body-xs"
                  textAlign={sentByMe ? "right" : "left"}
                >
                  {timeAgo.format(date)}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ChatMessages;
