import React from "react";
import { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import { observer } from "mobx-react-lite";
import { generatePath } from "react-router-dom";

import { SliderNavigation } from "../SliderNavigation/SliderNavigation";
import { NavigationWrapper, Slide } from "./styled";
import { SmallCard } from "../../Card/SmallCard/SmallCard";
import type { Movie, TVShow } from "types";
import { isMovie, isTvShow } from "utils";
import { APP_URLS } from "routes";
import { useStore } from "store";

import "swiper/css";
import "swiper/css/navigation";


interface Props {
  items: Movie[] | TVShow[];
  sliderName: string;
  loadItems?: () => void;
}

export const SimpleSlider: React.FC<Props> = observer(({ items, sliderName, loadItems }) => {
  const { accountStore } = useStore();
  const [showNavigation, setShowNavigation] = React.useState(false);
  const onMouseEnter = () => setShowNavigation(true);
  const onMouseLeave = () => setShowNavigation(false);

  const nextButtonClassName = `${sliderName.replace(/\s/g, "")}_slider-nav-next`;
  const prevButtonClassName = `${sliderName.replace(/\s/g, "")}_slider-nav-prev`;

  let slides = [] as React.ReactNode[];
  if(isMovie(items[0] as Movie | TVShow)) {
    const list = items as Movie[]
    slides = list.map(({ id, adult, poster_path, release_date, title, genres }, index) => {
      return (
        <Slide key={`${sliderName}_${id}_${index}`}>
          <SmallCard
            adult={adult}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
            genres={genres}
            sourcePath={generatePath(APP_URLS.movieDetails.path, { id })}
            onAddToWatchlist={() => accountStore.addToWatchlist(id, "movie")}
          />
        </Slide>
      )
    })
  };
  if(isTvShow(items[0] as Movie | TVShow)) {
    const list = items as TVShow[]
    slides = list.map(({ id, poster_path, first_air_date, genres, name }, index) => {
      return (
        <Slide key={`${sliderName}_${id}_${index}`}>
          <SmallCard
            adult={false}
            poster_path={poster_path}
            release_date={first_air_date}
            title={name}
            genres={genres}
            sourcePath={generatePath(APP_URLS.tvShowDetails.path, { id })}
            onAddToWatchlist={() => accountStore.addToWatchlist(id, "tv")}
          />
        </Slide>
      )
    })
  };


  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Swiper
        slidesPerView={1.2}
        spaceBetween="32px"
        onReachEnd={(swiper) => {
          if (swiper.slides.length && loadItems) {
            loadItems()
          }
        }}
        navigation={{
          nextEl: "." + nextButtonClassName,
          prevEl: "." + prevButtonClassName,
        }}
        modules={[Navigation]}
        breakpoints={{
          1440: {
            slidesPerView: 5
          },
          1100: {
            slidesPerView: 4
          },
          768: {
            slidesPerView: 3
          },
          450: {
            slidesPerView: 1.5
          },
        }}
      >
        <NavigationWrapper className={`${showNavigation ? "show" : ""}`}>
          <SliderNavigation
            nextButtonClassName={nextButtonClassName}
            prevButtonClassName={prevButtonClassName}
          />
        </NavigationWrapper>
        {slides}
      </Swiper>
    </div>
  )
});
