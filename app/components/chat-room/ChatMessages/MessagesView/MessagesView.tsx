import type { IAuthSession } from "@/app/helpers/types";
import type { IMessage } from "@/app/database/schema/Message";
import { getSession } from "@/app/lib/session";
import { Sheet, Stack, Typography } from "@mui/joy";
import { Visibility } from "@mui/icons-material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

interface IProps {
  messages: IMessage[];
}

const MessagesView = async ({ messages }: IProps) => {
  const session = getSession<IAuthSession>();

  return (
    <>
      {messages.map(message => {
        const sentByMe = message.sender.toString() === session?.uid;

        return (
          <Stack
            width="fit-content"
            key={message._id}
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
                {message.message}
              </Typography>
            </Sheet>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={sentByMe ? "flex-end" : "flex-start"}
              gap={1}
            >
              {message.read && sentByMe ? (
                <Visibility fontSize="small" />
              ) : null}
              <Typography
                py={0.4}
                level="body-xs"
                textAlign={sentByMe ? "right" : "left"}
              >
                {timeAgo.format(message.date)}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};

export default MessagesView;
