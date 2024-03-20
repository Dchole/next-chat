import { Sheet, Stack } from "@mui/joy";
import ContactsList from "./ContactsList";
import AppSearch from "../app-search";
import { getSession } from "@/app/lib/session";

const Contacts = () => {
  const session = getSession();

  if (!session) return null;

  return (
    <Sheet
      id="contacts"
      component="section"
      sx={{
        width: "100%",
        height: "100vh",
        position: "absolute",

        "@media(min-width: 900px)": {
          width: "400px",
          position: "relative"
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
