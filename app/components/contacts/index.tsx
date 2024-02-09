import { Box, Grid, Sheet, Stack } from "@mui/joy";
import ContactsList from "./ContactsList";
import AppSearch from "../app-search";

const Contacts = () => {
  return (
    <Sheet sx={{ width: "min(100%, 300px)" }}>
      <Stack id="contacts" component="section" spacing={2} padding={2}>
        <AppSearch />
        <ContactsList />
      </Stack>
    </Sheet>
  );
};

export default Contacts;
