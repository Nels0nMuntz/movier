import React from "react";
import Stack from "@mui/material/Stack/Stack";
import { Link } from "react-router-dom";
import { faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

import { Action, Poster, StyledLink, Wrapper } from "./styled";
import { getW300ImageUrl } from "api";
import { Typography } from "../../Typography/Typography";
import { SkeletonProvider, Skeleton } from "../../Skeleton";
import { FAIcon } from "../../FAIcon/FAIcon";


interface Props {
  title: string;
  poster_path: string;
  release_date: string;
  adult: boolean;
  genres: string[];
}

export const SmallCard: React.FC<Props> = observer((props) => {

  const { title, adult, poster_path, release_date, genres } = props;

  const [ready, setReady] = React.useState(true);

  const src = getW300ImageUrl(poster_path);
  const genresString = genres.length ? genres.slice(0, 3).join(" / ") : "";

  React.useEffect(() => {
    const buffer = new Image();
    buffer.onload = () => setReady(true);
    buffer.src = src;
  }, [src])

  return (
    <SkeletonProvider visible={!ready}>
      <Wrapper>
        <Stack direction="column" gap={2}>
          <Poster>
            <Skeleton variant="rectangular">
              <img src={src} alt={title} width={272} height={408} />
            </Skeleton>
            {ready && (
              <Stack direction="column" className="actions" gap={1} component="ul">
                <li>
                  <Link to="/" aria-label="Add to my list" title="Add to my list">
                    <Action>
                      <FAIcon icon={faPlus} />
                    </Action>
                  </Link>
                </li>
                <li>
                  <Link to="/" aria-label="Read more" title="Read more">
                    <Action>
                      <FAIcon icon={faInfo} />
                    </Action>
                  </Link>
                </li>
              </Stack>
            )}
          </Poster>
          <Skeleton variant="text">
            <StyledLink to="/">
              <Typography element="span" type="heading_6">{title}</Typography>
            </StyledLink>
          </Skeleton>
          <Skeleton variant="text">
            <Typography element="span" type="body_1" color="secondary">{genresString}</Typography>
          </Skeleton>
          <Skeleton variant="text">
            <Stack direction="row" gap={2}>
              <Typography element="span" type="body_1" color="secondary">{release_date.slice(0, 4)}</Typography>
              {adult && <Typography element="span" type="body_1" color="secondary">18+</Typography>}
            </Stack>
          </Skeleton>
        </Stack>
      </Wrapper>
    </SkeletonProvider>
  )
});
