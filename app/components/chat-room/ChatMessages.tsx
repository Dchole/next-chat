import { Box, Typography } from "@mui/joy";
import visuallyHidden from "@mui/utils/visuallyHidden";

const ChatMessages = () => {
  return (
    <Box bgcolor="slategray" flexGrow={1} component="section" id="messages">
      <Typography level="h3" sx={visuallyHidden}>
        Messages
      </Typography>
    </Box>
  );
};

export default ChatMessages;
