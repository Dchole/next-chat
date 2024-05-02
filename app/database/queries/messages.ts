import type { FilterQuery } from "mongoose";
import { type IMessage, Message } from "../schema/Message";
import { getSession } from "@/app/lib/session";
import { IAuthSession } from "@/app/helpers/types";
import { connectToWS } from "@/app/ws/initWs";
import { cache } from "react";

export const queryMessages = cache(
  async (contactId: string, query?: FilterQuery<IMessage>) => {
    const session = getSession<IAuthSession>();
    const ws = connectToWS();

    Message.on("created", data => {
      ws.send(JSON.stringify({ uid: session?.uid, message: data }));
    });

    return Message.find({ ...query })
      .where("sender")
      .or([
        { sender: contactId, receiver: session?.uid },
        { sender: session?.uid, receiver: contactId }
      ]);
  }
);

export const viewMessages = async (messages: string[]) => {
  return Message.updateMany().where("_id").in(messages).set({ read: true });
};
