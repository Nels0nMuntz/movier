import Stack from "@mui/material/Stack";

import { Typography } from "components";
import { formatRating } from "utils";
import { ImdbLogo, ImdbRating } from "../styled";

import imdbLogo from "../../../../assets/img/IMDB_Logo.svg";


interface Props {
  rating: number;
}

export const Rating: React.FC<Props> = ({ rating }) => {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <ImdbRating value={Number(formatRating(rating))} precision={0.1} readOnly />
      <Typography element="div" type="body_1">{formatRating(rating)}</Typography>
      <ImdbLogo src={imdbLogo} alt="imdb logo" />
    </Stack>
  )
};