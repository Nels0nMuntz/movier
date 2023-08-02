import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { observer } from "mobx-react-lite";
import { faFilm, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";

import { FAIcon, PrimaryButton, ScrollableCollection, Typography } from "../../";
import { Backdrop, Banner, Poster, Wrapper } from "./styled";
import { MovieDetails as IMovieDetails, Movie } from "types";
import { Release } from "../../common/Details/Release/Release";
import { Genre } from "../../common/Details/Genre/Genre";
import { getW1280ImageUrl, getW500ImageUrl } from "api";
import { InfoItem } from "../../common/Details/InfoItem/InfoItem";
import { formatMoney, formatRuntime } from "utils";
import { Reviews } from "../../common/Reviews/Reviews";
import { ImdbRating } from "components/common/Details/IMDBRating/styled";
import { Adult } from "components/common/Details/Adult/Adult";
import { ProductioCountries } from "components/common/Details/ProductioCountries/ProductioCountries";
import { useStore } from "store";


interface Props {
  movie: IMovieDetails<Movie>;
  loadSimilarMovies: () => void;
}

export const MovieDetails: React.FC<Props> = observer(function MovieDetails({ movie, loadSimilarMovies }) {
  const { accountStore } = useStore();
  const {
    adult,
    backdrop_path,
    budget,
    credits,
    id,
    genres,
    overview,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    reviews,
    runtime,
    similar,
    spoken_languages,
    title,
    vote_average,
  } = movie;

  const backdropUrl = getW1280ImageUrl(backdrop_path);
  const posterUrl = getW500ImageUrl(poster_path);
  const director = credits.crew.find(({ job }) => job === "Director")?.name;
  const production = production_companies.map(({ name }) => name).join(", ");
  const releaseDate = release_date.replace(/-/g, "/");
  const filmGenres = genres.map(({ name }) => name);
  const filmRuntime = formatRuntime(runtime);
  const filmBudget = formatMoney(budget);
  const filmRevenue = formatMoney(revenue);
  const filmLanguages = spoken_languages.map(({ english_name }) => english_name);

  const handleAddToFavorite = () => accountStore.addToFavorite(id, "movie");

  return (
    <Wrapper>
      <Banner>
        <Backdrop imageUrl={backdropUrl}>
          <Grid container zIndex={0} px={4}>
            <Grid item sm={12} md={8} display="flex" direction="column" justifyContent="center" gap={2}>
              <Typography element="h1" type="heading_1" className="title slide-1">{title}</Typography>
              <div className="slide-2">
                <ImdbRating value={vote_average} />
              </div>
              <Stack direction="row" gap={3} className="slide-3">
                {adult && (
                  <Adult />
                )}
                <Genre genres={genres} />
                <Release releaseDate={release_date} />
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
            <Poster src={posterUrl} alt={title} />
          </Grid>
          <Grid item md={8}>
            <Stack direction="column" gap={2}>
              <Typography element="h2" type="heading_4">Storyline</Typography>
              <Typography element="p" type="body_2">{overview}</Typography>
              <Grid container spacing={2}>
                <Grid item md={6}>
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
                <Grid item md={6}>
                  <InfoItem title="Runtime" value={{ data: filmRuntime }} />
                  <InfoItem title="Budget" value={{ data: filmBudget }} />
                  <InfoItem title="Revenue" value={{ data: filmRevenue }} />
                  <InfoItem
                    title={`${filmLanguages.length > 1 ? "Languages" : "Language"}`}
                    value={{ data: filmLanguages.join(", ") }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={4}>
                  <PrimaryButton fluid icon={<FAIcon icon={faFilm} />}>Trailer</PrimaryButton>
                </Grid>
                <Grid item sm={4}>
                  <PrimaryButton fluid icon={<FAIcon icon={faPlus} onClick={handleAddToFavorite}/>}>My List</PrimaryButton>
                </Grid>
                <Grid item sm={4}>
                  <PrimaryButton fluid icon={<FAIcon icon={faShare} />}>Share</PrimaryButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Reviews reviews={reviews.results} />
      <ScrollableCollection items={similar.results} title="Related movies" loadItems={loadSimilarMovies} />
    </Wrapper>
  )
})