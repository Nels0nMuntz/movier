import React from "react";
import Stack from "@mui/material/Stack";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { PrimaryLink, Typography, FAIcon, PrimaryButton, SkeletonProvider, Skeleton } from "components";
import { APP_URLS } from "routes";
import { Badge, Content, Poster, Wrapper } from "./styled";
import { getW1280ImageUrl } from "api";
import { MediaType, Nullable } from "types";

import topMoviesImg from "../../../../assets/img/top-movies.png";
import topSeriesImg from "../../../../assets/img/top-series.png"; 


interface Props {
  id: number;
  title: string;
  overview: string;
  imagePath: Nullable<string>;
  sourcePath: string;
  kind: MediaType;
}

export const LargeCard: React.FC<Props> = ({ title, overview, imagePath, kind, sourcePath }) => {
  const [ready, setReady] = React.useState(true);
  const src = imagePath ? getW1280ImageUrl(imagePath) : "";

  React.useEffect(() => {
    const buffer = new Image();
    buffer.onload = () => setReady(true);
    buffer.src = src;
  }, [src]);

  return (
    <SkeletonProvider visible={!ready}>
      <Wrapper>
        <Skeleton variant="rectangular">
          <Poster src={src} alt="" />
        </Skeleton>
        <Content>
          <Stack direction="column" gap={2}>
            <Skeleton variant="text">
              <Link to={sourcePath}>
                <Typography element="h3" type="heading_3">{title}</Typography>
              </Link>
            </Skeleton>
            <Skeleton variant="text">
              <Typography element="p" type="body_1" className="overview">{overview}</Typography>
            </Skeleton>
            <Stack direction="row" gap={1}>
              <PrimaryLink href={APP_URLS.browse.path} icon={<FAIcon icon={faPlay} />}>Play Now</PrimaryLink>
              <PrimaryButton icon={<FAIcon icon={faPlus} />}>My List</PrimaryButton>
            </Stack>
          </Stack>
        </Content>
        <Badge>
          <img src={kind === "movie" ? topMoviesImg : topSeriesImg} alt="top 10" />
        </Badge>
      </Wrapper>
    </SkeletonProvider>
  )
};
