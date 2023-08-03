import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { generatePath } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Movie, TVShow } from "types";
import { SmallCard } from "../Card/SmallCard/SmallCard";
import { isMovie, isTvShow } from "utils";
import { APP_URLS } from "routes";

interface Props {
  items: Movie[] | TVShow[];
}

export const SimpleCollection: React.FC<Props> = observer(({ items }) => {
  let list = [] as React.ReactNode[];
  if (isMovie(items[0] as Movie | TVShow)) {
    const movieItems = items as Movie[]
    list = movieItems.map(({ id, adult, poster_path, release_date, title, genres }, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} xl={3} key={`${id}_${index}`}>
          <SmallCard
            adult={adult}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
            genres={genres}
            sourcePath={generatePath(APP_URLS.movieDetails.path, { id })}
          />
        </Grid>
      )
    })
  };
  if (isTvShow(items[0] as Movie | TVShow)) {
    const listvShowItems = items as TVShow[]
    list = listvShowItems.map(({ id, poster_path, first_air_date, genres, name }, index) => {
      return (
        <Grid item xs={12} sm={6} md={4} xl={3} key={`${id}_${index}`}>
          <SmallCard
            adult={false}
            poster_path={poster_path}
            release_date={first_air_date}
            title={name}
            genres={genres}
            sourcePath={generatePath(APP_URLS.tvShowDetails.path, { id })}
          />
        </Grid>
      )
    })
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {list}
      </Grid>
    </Container>
  )
});
