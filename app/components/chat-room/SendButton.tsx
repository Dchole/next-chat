"use client";

import { Send } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/joy";
import { useFormStatus } from "react-dom";

function SendButton() {
  const { pending, ...rest } = useFormStatus();
  console.log(rest.data?.get("message"));

  return (
    <IconButton
      type="submit"
      color="primary"
      variant={pending ? "plain" : "soft"}
      disabled={pending}
      aria-label="Send message"
    >
      {pending ? <CircularProgress size="sm" /> : <Send />}
    </IconButton>
  );
}

export default SendButton;
