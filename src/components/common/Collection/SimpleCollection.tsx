import { generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Movie, TVShow } from "types";
import { SmallCard } from "../Card/SmallCard/SmallCard";
import { isMovie, isTvShow } from "utils";
import { APP_URLS } from "routes";
import { Grid } from "./styled";
import { useStore } from "store";

interface Props {
  items: Movie[] | TVShow[];
}

export const SimpleCollection: React.FC<Props> = observer(({ items }) => {
  const { accountStore } = useStore();

  if (!items.length) {
    return null;
  }

  let list = [] as React.ReactNode[];
  if (isMovie(items[0] as Movie | TVShow)) {
    const movieItems = items as Movie[]
    list = movieItems.map(({ id, adult, poster_path, release_date, title, genres }, index) => {
      return (
        <div key={`${id}_${index}`}>
          <SmallCard
            adult={adult}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
            genres={genres}
            sourcePath={generatePath(APP_URLS.movieDetails.path, { id })}
            onAddToWatchlist={() => accountStore.addToWatchlist(id, "movie")}
            showTools={false}
          />
        </div>
      )
    })
  };
  if (isTvShow(items[0] as Movie | TVShow)) {
    const listvShowItems = items as TVShow[]
    list = listvShowItems.map(({ id, poster_path, first_air_date, genres, name }, index) => {
      return (
        <div key={`${id}_${index}`}>
          <SmallCard
            adult={false}
            poster_path={poster_path}
            release_date={first_air_date}
            title={name}
            genres={genres}
            sourcePath={generatePath(APP_URLS.tvShowDetails.path, { id })}
            onAddToWatchlist={() => accountStore.addToWatchlist(id, "tv")}
            showTools={false}
          />
        </div>
      )
    })
  };

  return (
    <Grid>
      {list}
    </Grid>
  )
});
