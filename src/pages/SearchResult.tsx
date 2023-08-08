import Container from "@mui/material/Container";
import { observer } from "mobx-react-lite";

import { MainLayout } from "layouts";
import { SearchResult as SearchResultComponent } from "components";
import { useStore } from "store";


export const SearchResult = observer(() => {
  const { searchStore } = useStore();
  const { isSearchFaild } = searchStore;
  return (
    <MainLayout isFaild={isSearchFaild}>
      <Container maxWidth="xl">
        <SearchResultComponent/>
      </Container>
    </MainLayout>
  )
});