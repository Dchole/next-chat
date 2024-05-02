"use client";
import { useEffect, useState } from "react";
import { IMessage } from "@/app/database/schema/Message";

interface IProps {
  children: (messages: IMessage[]) => React.ReactNode;
}

const LiveMessages = ({ children }: IProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:3001");

    // Connection opened
    socket.addEventListener("open", event => {
      socket.send("Hello Server!");
    });

    // Listen for messages
    socket.addEventListener("message", event => {
      console.log("Message from server ", event.data);

      const blob = new Blob([event.data], { type: "application/json" });
      blob.text().then(text => {
        try {
          const newMessage = JSON.parse(text);
          setMessages(prevMessages => {
            return prevMessages.some(message => message._id === newMessage._id)
              ? prevMessages
              : [
                  ...prevMessages,
                  {
                    ...newMessage,
                    date: new Date(newMessage.date),
                    updatedAt: new Date(newMessage.updatedAt)
                  }
                ];
          });
        } catch (error) {
          console.log(text);
        }
      });
    });
  }, []);

  return <>{children(messages)}</>;
};

export default LiveMessages;
