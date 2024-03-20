import type { FilterQuery } from "mongoose";
import { type IMessage, Message } from "../schema/Message";
import { getSession } from "@/app/lib/session";
import { IAuthSession } from "@/app/helpers/types";

export const queryMessages = async (
  contactId: string,
  query?: FilterQuery<IMessage>
) => {
  const session = getSession<IAuthSession>();

  return Message.find({ ...query })
    .where("sender")
    .or([
      { sender: contactId, receiver: session?.uid },
      { sender: session?.uid, receiver: contactId }
    ]);
};
