import {
  model,
  models,
  Schema,
  type Model,
  type Document,
  type ObjectId
} from "mongoose";

interface IMessage extends Document {
  message: string;
  sender: string;
  receiver: string;
  date: Date;
  read: boolean;
}

const MessageSchema = new Schema(
  {
    message: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "Contact" },
    receiver: { type: Schema.Types.ObjectId, ref: "Contact" },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Message =
  (models.Message as Model<
    IMessage,
    {},
    {},
    {},
    Document<unknown, {}, IMessage> &
      IMessage & {
        _id: ObjectId;
      },
    any
  >) || model<IMessage>("Message", MessageSchema);
