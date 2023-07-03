import { Typography } from "components";

export const NotFound = () => {
  return (
    <Typography type="heading_4" element="h1" styles={theme => ({ color: theme.palette.common.black })}>
      Page is not found
    </Typography>
  )
};
