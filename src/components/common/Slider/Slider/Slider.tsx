import React from "react";
import { Navigation } from "swiper";
import { Swiper } from "swiper/react";

import { SliderNavigation } from "../SliderNavigation/SliderNavigation";
import { NavigationWrapper, Slide } from "./styled";
import { SmallCard } from "../../Card/SmallCard";
import type { Movie, TVShow } from "types";

import "swiper/css";
import "swiper/css/navigation";


const isMovie = (item: Movie | TVShow) => {
  return item.kind === "movie";
}
const isTvShow = (item: Movie | TVShow) => {
  return item.kind === "tvShow";
}

interface Props {
  items: Movie[] | TVShow[];
  sliderName: string;
  loadItems?: () => void;
}

export const Slider: React.FC<Props> = ({ items, sliderName, loadItems }) => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  const onMouseEnter = () => setShowNavigation(true);
  const onMouseLeave = () => setShowNavigation(false);

  const nextButtonClassName = `${sliderName.replace(/\s/g, "")}_slider-nav-next`;
  const prevButtonClassName = `${sliderName.replace(/\s/g, "")}_slider-nav-prev`;
  let slides = [] as React.ReactNode[];
  if(isMovie(items[0] as Movie | TVShow)) {
    const list = items as Movie[]
    slides = list.map(({ id, adult, poster_path, release_date, title, genres }) => {
      return (
        <Slide key={`${sliderName}_${id}`}>
          <SmallCard
            adult={adult}
            poster_path={poster_path}
            release_date={release_date}
            title={title}
            genres={genres}
          />
        </Slide>
      )
    })
  };
  if(isTvShow(items[0] as Movie | TVShow)) {
    const list = items as TVShow[]
    slides = list.map(({ id, adult, poster_path, first_air_date, genres, name }) => {
      return (
        <Slide key={`${sliderName}_${id}`}>
          <SmallCard
            adult={adult}
            poster_path={poster_path}
            release_date={first_air_date}
            title={name}
            genres={genres}
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
        slidesPerView={5}
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
};
