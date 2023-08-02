import Stack from "@mui/material/Stack";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import { Typography, FAIcon } from "components";


interface Props {
  value: number;
}

export const Seasons: React.FC<Props> = ({ value }) => {
  return (
    <Typography element="div" type="body_1" color="secondary">
      <Stack direction="row" gap={1} alignItems="center">
        <FAIcon icon={faClockFour} color="inherit" />
        <Typography element="span" type="body_1" color="secondary">{`${value} Season${value > 1 ? "s" : ""}`}</Typography>
      </Stack>
    </Typography>
  )
};