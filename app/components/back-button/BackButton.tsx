"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const BackButton = () => {
  const chatRoomRef = useRef<HTMLDivElement | null>(null);
  const { push } = useRouter();

  const handleBack = useCallback(
    (event?: React.MouseEvent<HTMLAnchorElement>) => {
      event?.preventDefault();

      if (chatRoomRef.current) {
        chatRoomRef.current.classList.add("slide_left");
        chatRoomRef.current.getAnimations().forEach(animation => {
          animation.onfinish = () => {
            push("/");
          };
        });
      }
    },
    []
  );

  useEffect(() => {
    chatRoomRef.current = document.querySelector("#chat-room");

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && chatRoomRef.current) {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      return window.removeEventListener("keydown", handleKey);
    };
  }, [push, handleBack]);

  return (
    <Button
      href="/"
      component={Link}
      variant="plain"
      color="neutral"
      sx={{ px: 1 }}
      onClick={handleBack}
    >
      <ArrowBack />
    </Button>
  );
};

export default BackButton;
