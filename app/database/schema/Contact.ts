import {
  model,
  models,
  Schema,
  type Model,
  type Document,
  type ObjectId
} from "mongoose";

export interface IContact extends Document {
  name: string;
  avatar: string;
  message: string;
  google_id: string;
  unreadMessages: number;
  date: Date;
}

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: String,
    message: String,
    google_id: { type: String, required: true },
    unreadMessages: Number,
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Contact =
  (models.Contact as Model<
    IContact,
    {},
    {},
    {},
    Document<unknown, {}, IContact> &
      IContact & {
        _id: ObjectId;
      },
    any
  >) || model<IContact>("Contact", ContactSchema);
