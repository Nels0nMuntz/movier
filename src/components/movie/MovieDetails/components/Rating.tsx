import Stack from "@mui/material/Stack";

import { Typography } from "components";
import { ImdbLogo, ImdbRating } from "../styled";

import imdbLogo from "../../../../assets/img/IMDB_Logo.svg";


const formatRating = (rating: number) => {
  const _rating = rating * 10 * 0.05;
  return _rating.toFixed(1);
};


interface Props {
  rating: number;
}

export const Rating: React.FC<Props> = ({ rating }) => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <ImdbRating name="read-only" value={Number(formatRating(rating))} precision={0.1} readOnly />
      <Typography element="div" type="body_1">{formatRating(rating)}</Typography>
      <ImdbLogo src={imdbLogo} alt="imdb logo" />
    </Stack>
  )
};