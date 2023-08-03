import { observer } from "mobx-react-lite";

import { MainLayout } from "layouts";
import { useStore } from "store";
import { SimpleCollection } from "components";


export const Favorite = observer(() => {
  const { moviesPageStore } = useStore();
  const isloading = moviesPageStore.isFavoriteMoviesLoading;
  const items = moviesPageStore.favoriteMovies.data.data;  
  return (
    <MainLayout isLoading={isloading}>
      <SimpleCollection items={items}/>
    </MainLayout>
  )
});
