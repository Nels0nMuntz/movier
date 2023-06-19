import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import { faAngleRight, faAngleLeft, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons"
import Stack from "@mui/material/Stack";

import { PrimaryButton, PrimaryLink, Typography, FAIcon } from "components";
import { Badge, Ganre, GanreOutlined, NavButton, Slide, SlideBackdrop, SlideContent, SlideContentWrap } from "./styled";
import { APP_URLS } from "routes/urls";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";


export const MainSlider = () => {
  const slides = [] as HTMLElement[];

  return (
    <section>
      <Swiper
        slidesPerView={1}
        effect="fade"
        modules={[EffectFade, Navigation, Pagination]}
        navigation={{
          nextEl: ".main-slider-nav--next",
          prevEl: ".main-slider-nav--prev",
        }}
        loop
        onSlideChangeTransitionEnd={swiper => {       
          slides[swiper.realIndex]?.classList.replace("hide", "show")         
        }}
        onActiveIndexChange={() => {
          slides.forEach(slide => slide.classList.remove("show"));
          slides.forEach(slide => slide.classList.add("hide"));
        }}
      >
        <NavButton prev className="main-slider-nav main-slider-nav--next" title="Previous slide" aria-label="Previous slide">
          <FAIcon icon={faAngleLeft} size="3x" />
        </NavButton>
        <NavButton next className="main-slider-nav main-slider-nav--prev" title="Next slide" aria-label="Next slide">
          <FAIcon icon={faAngleRight} size="3x" />
        </NavButton>
        <SwiperSlide>
          <Slide>
            <SlideBackdrop>
              <img
                src="https://image.tmdb.org/t/p/original/1inZm0xxXrpRfN0LxwE2TXzyLN6.jpg"
                alt=""
              />
              <SlideContentWrap>
                <SlideContent ref={(e) => e && slides.push(e)}>
                  <Badge element="div" type="heading_5">New</Badge>
                  <Typography element="h1" type="heading_1">
                    Iron Door
                  </Typography>
                  <Stack direction="row" gap={3} mb={4} alignItems="center">
                    <Ganre element="span" type="body_1">
                      2021
                    </Ganre>
                    <GanreOutlined element="span" type="body_1">
                      18+
                    </GanreOutlined>
                    <Ganre element="span" type="body_1">
                      2h 6m
                    </Ganre>
                  </Stack>
                  <Typography element="p" type="body_1">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
                  </Typography>
                  <Stack direction="row" gap={2} mt={3}>
                    <PrimaryLink href={APP_URLS.browse} icon={<FAIcon icon={faPlay} />}>Play Now</PrimaryLink>
                    <PrimaryButton icon={<FAIcon icon={faPlus} />}>My List</PrimaryButton>
                  </Stack>
                </SlideContent>
              </SlideContentWrap>
            </SlideBackdrop>
          </Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide>
            <SlideBackdrop>
              <img
                src="https://image.tmdb.org/t/p/original/gMJngTNfaqCSCqGD4y8lVMZXKDn.jpg"
                alt=""
              />
              <SlideContentWrap>
                <SlideContent ref={(e) => e && slides.push(e)}>
                  <Typography element="h1" type="heading_1">
                    Iron Door
                  </Typography>
                  <Stack direction="row" gap={3} mb={4} alignItems="center">
                    <Ganre element="span" type="body_1">
                      2021
                    </Ganre>
                    <Ganre element="span" type="body_1">
                      18+
                    </Ganre>
                    <Ganre element="span" type="body_1">
                      2h 6m
                    </Ganre>
                  </Stack>
                  <Typography element="p" type="body_1">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
                  </Typography>
                  <Stack direction="row" gap={2} mt={3}>
                    <PrimaryLink href={APP_URLS.browse} icon={<FAIcon icon={faPlay} />}>Play Now</PrimaryLink>
                    <PrimaryButton icon={<FAIcon icon={faPlus} />}>My List</PrimaryButton>
                  </Stack>
                </SlideContent>
              </SlideContentWrap>
            </SlideBackdrop>
          </Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide>
            <SlideBackdrop>
              <img
                src="https://image.tmdb.org/t/p/original/6l1SV3CWkbbe0DcAK1lyOG8aZ4K.jpg"
                alt=""
              />
              <SlideContentWrap>
                <SlideContent ref={(e) => e && slides.push(e)}>
                  <Typography element="h1" type="heading_1">
                    Iron Door
                  </Typography>
                  <Stack direction="row" gap={3} mb={4} alignItems="center">
                    <Ganre element="span" type="body_1">
                      2021
                    </Ganre>
                    <Ganre element="span" type="body_1">
                      18+
                    </Ganre>
                    <Ganre element="span" type="body_1">
                      2h 6m
                    </Ganre>
                  </Stack>
                  <Typography element="p" type="body_1">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
                  </Typography>
                  <Stack direction="row" gap={2} mt={3}>
                    <PrimaryLink href={APP_URLS.browse} icon={<FAIcon icon={faPlay} />}>Play Now</PrimaryLink>
                    <PrimaryButton icon={<FAIcon icon={faPlus} />}>My List</PrimaryButton>
                  </Stack>
                </SlideContent>
              </SlideContentWrap>
            </SlideBackdrop>
          </Slide>
        </SwiperSlide>
      </Swiper>
    </section>
  )
};
