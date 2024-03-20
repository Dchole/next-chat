"use client";

import { Send } from "@mui/icons-material";
import { CircularProgress, IconButton, Input } from "@mui/joy";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

function TextInput() {
  const { data, pending } = useFormStatus();
  const [value, setValue] = useState("");

  useEffect(() => {
    const message = data?.get("message") as string;
    if (!message && !pending) {
      setValue("");
    }
  }, [data, pending]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Input
      name="message"
      type="text"
      variant="soft"
      value={value}
      onChange={handleInput}
      placeholder="Type a message"
      endDecorator={
        <IconButton
          type="submit"
          color="primary"
          variant={pending ? "plain" : "soft"}
          disabled={pending}
          aria-label="Send message"
        >
          {pending ? <CircularProgress size="sm" /> : <Send />}
        </IconButton>
      }
    />
  );
}

export default TextInput;
