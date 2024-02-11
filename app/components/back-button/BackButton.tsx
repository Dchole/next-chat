"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button, useTheme } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

const BackButton = () => {
  const chatRoomRef = useRef<HTMLDivElement | null>(null);
  const { push } = useRouter();
  const { breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up("md"));

  const handleBack = useCallback(
    (event?: React.MouseEvent<HTMLAnchorElement>) => {
      event?.preventDefault();

      if (!isDesktop && chatRoomRef.current) {
        chatRoomRef.current.classList.add("slide_left");
        chatRoomRef.current.getAnimations().forEach(animation => {
          animation.onfinish = () => {
            push("/");
          };
        });
      } else {
        push("/");
      }
    },
    [isDesktop]
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
      aria-label="back to contacts"
      color="neutral"
      variant="plain"
      component={Link}
      onClick={handleBack}
      sx={({ breakpoints }) => ({
        px: 1,
        [breakpoints.up("md")]: {
          display: "none"
        }
      })}
    >
      <ArrowBack />
    </Button>
  );
};

export default BackButton;
