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

const ContactsList = ({}) => {
  return (
    <List sx={{ "--ListItemDecorator-size": "56px" }}>
      <ListItem sx={{ px: 0 }}>
        <ListItemButton component={Link} href="/chat-room-1" sx={{ py: 2 }}>
          <ListItemDecorator>
            <Avatar />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">John Doe</Typography>
            <Typography level="body-sm" noWrap>
              I&apos;ll be in your neighborhood doing errands this Tuesday.
            </Typography>
          </ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem sx={{ px: 0 }}>
        <ListItemButton component={Link} href="/chat-room-2" sx={{ py: 2 }}>
          <ListItemDecorator>
            <Avatar />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">John Doe</Typography>
            <Typography level="body-sm" noWrap>
              I&apos;ll be in your neighborhood doing errands this Tuesday.
            </Typography>
          </ListItemContent>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default ContactsList;
