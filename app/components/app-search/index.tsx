import { Search } from "@mui/icons-material";
import { FormControl, Input } from "@mui/joy";

const AppSearch = () => {
  return (
    <FormControl id="app-search">
      <Input
        type="search"
        placeholder="Search conversation or contact"
        startDecorator={<Search />}
        aria-label="Search conversation or contact"
      />
    </FormControl>
  );
};

export default AppSearch;
