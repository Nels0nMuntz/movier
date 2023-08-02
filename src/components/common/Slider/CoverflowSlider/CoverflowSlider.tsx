import React from "react";
import { EffectCoverflow, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { observer } from "mobx-react-lite";
import { generatePath } from "react-router-dom";

import { NavigationWrapper, SliderWrapper } from "./styled";
import { SliderNavigation } from "../SliderNavigation/SliderNavigation";
import { LargeCard } from "components/common/Card/LargeCard/LargeCard";
import { MediaType, Movie, TVShow, UniqueId } from "types";
import { isMovie, isTvShow } from "utils";
import { APP_URLS } from "routes";

import "swiper/css";
import "swiper/css/effect-coverflow";


export interface CoverflowSliderItem {
  id: UniqueId;
  title: string;
  overview: string;
  imagePath: string;
  kind: MediaType,
}

interface Props {
  items: Movie[] | TVShow[];
}

export const CoverflowSlider: React.FC<Props> = observer(({ items }) => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  const onMouseEnter = () => setShowNavigation(true);
  const onMouseLeave = () => setShowNavigation(false);

  const nextButtonClassName = "coverflow_slider-nav-next";
  const prevButtonClassName = "coverflow_slider-nav-prev";

  let slides = [] as React.ReactNode[];
  if (isMovie(items[0] as Movie | TVShow)) {
    const list = items as Movie[]
    slides = list.map(({ id, title, overview, poster_path, kind }, index) => {
      return (
        <SwiperSlide key={`${id}_${index}`}>
          <LargeCard
            id={id}
            title={title}
            overview={overview}
            imagePath={poster_path}
            kind={kind}
            sourcePath={generatePath(APP_URLS.movieDetails.path, { id })}
          />
        </SwiperSlide>
      )
    })
  };
  if (isTvShow(items[0] as Movie | TVShow)) {
    const list = items as TVShow[]
    slides = list.map(({ id, poster_path, name, overview, kind }, index) => {
      return (
        <SwiperSlide key={`${id}_${index}`}>
          <LargeCard
            id={id}
            title={name}
            overview={overview}
            imagePath={poster_path}
            kind={kind}
            sourcePath={generatePath(APP_URLS.tvShowDetails.path, { id })}
          />
        </SwiperSlide>
      )
    })
  };

  // const slides = items.map(({ id, title, overview, imagePath, kind }) => (
  //   <SwiperSlide key={id}>
  //     <LargeCard
  //       id={id}
  //       title={title}
  //       overview={overview}
  //       imagePath={imagePath}
  //       kind={kind}
  //     />
  //   </SwiperSlide>
  // ));

  return (
    <SliderWrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          slideShadows: true,
        }}
        navigation={{
          nextEl: `.${nextButtonClassName}`,
          prevEl: `.${prevButtonClassName}`,
        }}
        loop
        speed={1250}
        modules={[EffectCoverflow, Navigation]}
        breakpoints={{
          900: {
            slidesPerView: 2
          }
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
    </SliderWrapper>
  )
});
