import { Link, generatePath } from "react-router-dom"

import { Skeleton, SkeletonProvider, Typography } from "components"
import { Item } from "./styled"
import { useImageLoadingTracker } from "hooks"
import { MediaType, Nullable } from "types"
import { getW92ImageUrl } from "api"
import { APP_URLS } from "routes"


interface Props {
  id: number;
  title: string;
  posterPath: Nullable<string>;
  genres: string[];
  mediaType: MediaType;
}

const SearchItem: React.FC<Props> = ({ id, genres, title, posterPath, mediaType }) => {
  const path = mediaType === "movie"
    ? generatePath(APP_URLS.movieDetails.path, { id })
    : generatePath(APP_URLS.tvShowDetails.path, { id });
  const src = posterPath ? getW92ImageUrl(posterPath) : "";
  const ready = useImageLoadingTracker(src);

  const genresString = genres.map(item => item).join(" / ");
  return (
    <SkeletonProvider visible={!ready}>
      <Item>
        <div className="grid">
          {!!src && (
            <Skeleton variant="rectangular" width={92} height={60} style={{ flexShrink: 0 }}>
              <Link to={path} className="img-link">
                <img src={src} />
              </Link>
            </Skeleton>
          )}
          <div className="content">
            <Link to={path}>
              <Typography element="span" type="body_1" className="title">{title}</Typography>
            </Link>
            <Typography element="span" type="body_1" className="title">{genresString}</Typography>
          </div>
        </div>
      </Item>
    </SkeletonProvider>
  )
}

export default SearchItem