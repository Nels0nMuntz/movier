import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Typography } from "components";
import { Link } from "../../../movie/MovieDetails/styled";


interface ItemValue {
  data: string,
  link?: string,
}

interface Props {
  title: string;
  value: ItemValue | ItemValue[];
}

export const InfoItem: React.FC<Props> = ({ title, value }) => {
  const isValueArray = Array.isArray(value);
  return (
    <Grid container spacing={2} mb={1}>
      <Grid item xs={3}>
        <Typography element="span" type="body_1">{title}</Typography>
      </Grid>
      <Grid item xs={9}>
        {isValueArray ? (
          <Stack direction="row" gap={0.5} alignItems="center" flexWrap="wrap">
            {value.map(({ data, link }) => {
              return link ? (
                <Link to={link} key={data + link}>
                  <Typography element="span" type="body_1" className="body-small">{data}</Typography>
                </Link>
              ) : (
                <Typography element="span" type="body_1" className="body-small">{data}</Typography>
              )
            })}
          </Stack>
        ) : (
          <>
            {value.link ? (
              <Link to={value.link}>
                <Typography element="span" type="body_1" className="body-small">{value.data}</Typography>
              </Link>
            ) : (
              <Typography element="span" type="body_1" className="body-small">{value.data}</Typography>
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
};
