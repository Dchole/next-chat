import { queryContacts } from "@/app/database/queries/contacts";
import { Contact } from "@/app/database/schema/Contact";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography
} from "@mui/joy";
import Link from "next/link";

const ContactsList = async ({}) => {
  const contacts = await queryContacts({});

  return (
    <List sx={{ "--ListItemDecorator-size": "56px" }}>
      {contacts.map(contact => (
        <ListItem key={contact._id} sx={{ px: 0 }}>
          <ListItemButton
            component={Link}
            href={`/${contact._id}`}
            sx={{ py: 2 }}
          >
            <ListItemDecorator>
              <Avatar src={contact.avatar} alt="" />
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{contact.name}</Typography>
              <Typography level="body-sm" noWrap>
                {contact.message}
              </Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactsList;
