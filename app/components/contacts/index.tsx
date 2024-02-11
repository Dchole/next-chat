import { Sheet, Stack } from "@mui/joy";
import ContactsList from "./ContactsList";
import AppSearch from "../app-search";

const Contacts = () => {
  return (
    <Sheet
      id="contacts"
      component="section"
      sx={{
        width: "100%",
        height: "100vh",
        position: "absolute",

        "@media(min-width: 768px)": {
          width: "400px"
        }
      }}
    >
      <Stack spacing={2} padding={2}>
        <AppSearch />
        <ContactsList />
      </Stack>
    </Sheet>
  );
};

export default Contacts;
