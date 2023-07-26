import Stack from "@mui/material/Stack";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

import { Typography, FAIcon } from "components";


const formatDate = (releaseDate: string) => {
  return releaseDate.slice(0,4);
};


interface Props {
  releaseDate: string;
}

export const Release: React.FC<Props> = ({ releaseDate }) => {
  return (
    <Typography element="div" type="body_1" color="secondary">
      <Stack direction="row" gap={1} alignItems="center">
        <FAIcon icon={faFaceSmile} color="inherit" />
        <Typography element="span" type="body_1" color="secondary">{formatDate(releaseDate)}</Typography>
      </Stack>
    </Typography>
  )
};