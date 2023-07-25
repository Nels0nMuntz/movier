import React from "react";
import { EffectCoverflow, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { observer } from "mobx-react-lite";

import { NavigationWrapper, SliderWrapper } from "./styled";
import { SliderNavigation } from "../SliderNavigation/SliderNavigation";
import { UniqueId } from "types";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { LargeCard } from "components/common/Card/LargeCard/LargeCard";


export interface CoverflowSliderItem {
  id: UniqueId;
  title: string;
  overview: string;
  imagePath: string;
  kind: "movie" | "series",
}

interface Props {
  items: CoverflowSliderItem[]
}

export const CoverflowSlider: React.FC<Props> = observer(({ items }) => {
  const [showNavigation, setShowNavigation] = React.useState(false);
  const onMouseEnter = () => setShowNavigation(true);
  const onMouseLeave = () => setShowNavigation(false);

  const nextButtonClassName = "coverflow_slider-nav-next";
  const prevButtonClassName = "coverflow_slider-nav-prev";

  const slides = items.map(({ id, title, overview, imagePath, kind }) => (
    <SwiperSlide key={id}>
      <LargeCard
        id={id}
        title={title}
        overview={overview}
        imagePath={imagePath}
        kind={kind}
      />
    </SwiperSlide>
  ));

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
