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

import noImage from "../../../../assets/img/no-image.svg"


interface Props {
  title: string;
  poster_path: string | null;
  release_date: string;
  adult: boolean;
  genres: string[];
  sourcePath: string;
  showTools?: boolean;
  onAddToWatchlist: () => void;
}

export const SmallCard: React.FC<Props> = observer((props) => {

  const { title, adult, poster_path, release_date, genres, sourcePath, showTools, onAddToWatchlist } = props;

  const [ready, setReady] = React.useState(true);

  let Img;

  if (poster_path) {
    const src = getW300ImageUrl(poster_path);
    Img = <img src={src} alt={title} width={272} height={408} />
  } else {
    Img = <img src={noImage} alt={title} width={272} height={408} />
  }

  const genresString = genres.length ? genres.slice(0, 3).join(" / ") : "";
  const toolsVisible = (showTools === undefined || showTools === true) && ready;

  React.useEffect(() => {
    if (poster_path) {
      const src = getW300ImageUrl(poster_path);
      const buffer = new Image();
      buffer.onload = () => setReady(true);
      buffer.src = src;
    }
  }, []);

  return (
    <SkeletonProvider visible={!ready}>
      <Wrapper>
        <Stack direction="column" gap={2}>
          <Poster>
            <Skeleton variant="rectangular">
              {Img}
            </Skeleton>
            {toolsVisible && (
              <Stack direction="column" className="actions" gap={1} component="ul">
                <li>
                  <button 
                    aria-label="Add to my list" 
                    title="Add to my list"
                    onClick={onAddToWatchlist}
                  >
                    <Action>
                      <FAIcon icon={faPlus} />
                    </Action>
                  </button>
                </li>
                <li>
                  <Link to={sourcePath} aria-label="Read more" title="Read more">
                    <Action>
                      <FAIcon icon={faInfo} />
                    </Action>
                  </Link>
                </li>
              </Stack>
            )}
          </Poster>
          <Skeleton variant="text">
            <StyledLink to={sourcePath}>
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
