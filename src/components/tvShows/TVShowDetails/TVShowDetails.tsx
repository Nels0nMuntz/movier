import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { faFilm, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";

import { Backdrop, Banner, Poster, Wrapper } from "./styled";
import { TVShow, TVShowDetails as ITVShowDetails } from "types";
import { getW1280ImageUrl, getW500ImageUrl } from "api";
import { FAIcon, PrimaryButton, ScrollableCollection, Typography } from "components";
import { IMDBRating } from "components/common/Details/IMDBRating/IMDBRating";
import { Adult } from "components/common/Details/Adult/Adult";
import { Genre } from "components/common/Details/Genre/Genre";
import { ProductioCountries } from "components/common/Details/ProductioCountries/ProductioCountries";
import { Seasons } from "./components/Seasons";
import { Release } from "components/common/Details/Release/Release";
import { InfoItem } from "components/common/Details/InfoItem/InfoItem";
import { Reviews } from "components/common/Reviews/Reviews";
import { useStore } from "store";


export const TVShowDetails: React.FC = observer(function TVShowDetails() {

  const { tvShowsPageStore, accountStore } = useStore();
  const tvShow = tvShowsPageStore.tvShow.data as ITVShowDetails<TVShow>;
  const loadSimilarTVShows = tvShowsPageStore.getSimilarTVShows;
  const addToWatchlist = accountStore.addToWatchlist;

  const {
    adult,
    backdrop_path,
    credits,
    id,
    genres,
    first_air_date,
    name,
    number_of_seasons,
    overview,
    poster_path,
    production_companies,
    production_countries,
    reviews,
    similar,
    spoken_languages,
    vote_average,
  } = tvShow;

  const backdropUrl = getW1280ImageUrl(backdrop_path);
  const posterUrl = getW500ImageUrl(poster_path);
  const director = credits.crew.find(({ job }) => job === "Director")?.name;
  const production = production_companies.map(({ name }) => name).join(", ");
  const releaseDate = first_air_date.replace(/-/g, "/");
  const filmGenres = genres.map(({ name }) => name);
  const filmLanguages = spoken_languages.map(({ english_name }) => english_name);
  const handleAddToWatchlist = () => { 
    addToWatchlist(id, "tv")
  };

  return (
    <Wrapper>
      <Banner>
        <Backdrop imageUrl={backdropUrl}>
          <Grid container zIndex={0} px={4}>
            <Grid item sm={12} md={8} display="flex" direction="column" justifyContent="center" gap={2}>
              <Typography element="h1" type="heading_1" className="title slide-1">{name}</Typography>
              <div className="slide-2">
                <IMDBRating value={vote_average} />
              </div>
              <Stack direction="row" gap={3} className="slide-3">
                {adult && (
                  <Adult />
                )}
                <Genre genres={genres} />
                <Seasons value={number_of_seasons} />
                <Release releaseDate={first_air_date} />
                <ProductioCountries productionCountries={production_countries} />
              </Stack>
              <Typography element="p" type="body_1" className="description slide-4">{overview}</Typography>
            </Grid>
          </Grid>
        </Backdrop>
      </Banner>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" py={8}>
          <Grid item md={4} width={1}>
            <Poster src={posterUrl} alt={name} />
          </Grid>
          <Grid item md={8}>
            <Stack direction="column" gap={3}>
              <Typography element="h2" type="heading_4">Storyline</Typography>
              <Typography element="p" type="body_2">{overview}</Typography>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  {director && (
                    <InfoItem title={"Director"} value={{ data: director, link: "/" }} />
                  )}
                  <InfoItem title="Production" value={{ data: production }} />
                  <InfoItem title="Released" value={{ data: releaseDate }} />
                  <InfoItem
                    title="Genres"
                    value={filmGenres.map(name => ({ data: name, link: "/" }))}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <InfoItem
                    title={`${filmLanguages.length > 1 ? "Languages" : "Language"}`}
                    value={{ data: filmLanguages.join(", ") }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <PrimaryButton fluid icon={<FAIcon icon={faFilm} />}>Trailer</PrimaryButton>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <PrimaryButton 
                    fluid 
                    icon={<FAIcon icon={faPlus}
                    onClick={handleAddToWatchlist}
                  />}>
                    My List
                  </PrimaryButton>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <PrimaryButton fluid icon={<FAIcon icon={faShare} />}>Share</PrimaryButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Reviews reviews={reviews.results} />
      <ScrollableCollection items={similar.results} title="Related TV shows" loadItems={loadSimilarTVShows} />
    </Wrapper>
  )
});
