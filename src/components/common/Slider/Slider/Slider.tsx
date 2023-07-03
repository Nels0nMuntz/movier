import React from "react";
import { Navigation } from "swiper";
import { Swiper } from "swiper/react";

import { SliderNavigation } from "../SliderNavigation/SliderNavigation";
import { NavigationWrapper, Slide } from "./styled";
import { SmallCard } from "../../Card/SmallCard";
import { Movie } from "types";

import "swiper/css";
import "swiper/css/navigation";


interface Props {
  items: Movie[];
  sliderName: string;
  loadItems?: () => void;
}

export const Slider: React.FC<Props> = ({ items, sliderName, loadItems }) => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  const onMouseEnter = () => setShowNavigation(true);
  const onMouseLeave = () => setShowNavigation(false);

  const nextButtonClassName = `${sliderName.replace(/\s/g, "")}_slider-nav-next`;
  const prevButtonClassName = `${sliderName.replace(/\s/g, "")}_slider-nav-prev`;

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
        {items.map(({ id, adult, poster_path, release_date, title, genres }) => {
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
        })}
      </Swiper>
    </div>
  )
};
