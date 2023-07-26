import Stack from "@mui/material/Stack";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Typography, FAIcon } from "components";


export const Adult: React.FC = () => {
  return (
    <Typography element="div" type="body_1" color="secondary">
      <Stack direction="row" gap={1} alignItems="center">
        <FAIcon icon={faUser} color="inherit" />
        <Typography element="span" type="body_1" color="secondary">18+</Typography>
      </Stack>
    </Typography>
  )
};