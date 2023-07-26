import Stack from "@mui/material/Stack";
import { faEarthAmerica } from "@fortawesome/free-solid-svg-icons";

import { Typography, FAIcon } from "components";


interface Props {
  productionCountries: {
    iso_3166_1: string,
    name: string,
  }[]
}

export const ProductioCountries: React.FC<Props> = ({ productionCountries }) => {
  return (
    <Typography element="div" type="body_1" color="secondary">
      <Stack direction="row" gap={1} alignItems="center">
        <FAIcon icon={faEarthAmerica} color="inherit" />
        <Typography element="span" type="body_1" color="secondary">{productionCountries[0]?.name}</Typography>
      </Stack>
    </Typography>
  )
};
