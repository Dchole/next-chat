import type { FilterQuery } from "mongoose";
import type { IAuthSession } from "@/app/helpers/types";
import { Contact, type IContact } from "../schema/Contact";
import { getSession } from "@/app/lib/session";

export const queryContacts = async (query: FilterQuery<IContact>) => {
  const session = getSession<IAuthSession>();

  return Contact.find({ ...query })
    .where({ google_id: { $ne: session?.uid } })
    .sort({ date: -1 })
    .select("-__v -google_id");
};

export const getContact = async (id: string) => {
  return Contact.findById(id);
};
