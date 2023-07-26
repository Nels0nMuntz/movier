import Stack from "@mui/material/Stack";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

import { Typography, FAIcon } from "components";
import { Genre as GenreType } from "types";


interface Props {
  genres: GenreType[];
}

export const Genre: React.FC<Props> = ({ genres }) => {
  return (
    <Typography element="div" type="body_1" color="secondary">
      <Stack direction="row" gap={1} alignItems="center">
        <FAIcon icon={faFilm} color="inherit" />
        <Typography element="span" type="body_1" color="secondary">{genres[0]?.name}</Typography>
      </Stack>
    </Typography>
  )
};