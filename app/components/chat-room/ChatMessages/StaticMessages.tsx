import { queryMessages } from "@/app/database/queries/messages";
import MessagesView from "./MessagesView";

interface IProps {
  contactId: string;
}

const StaticMessages = async ({ contactId }: IProps) => {
  const messages = await queryMessages(contactId);
  console.log(typeof messages[0].date);

  return <MessagesView messages={messages} />;
};

export default StaticMessages;
