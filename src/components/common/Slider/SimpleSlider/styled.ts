import { styled } from "@mui/material/styles";
import { SwiperSlide } from "swiper/react";


export const Slide = styled(SwiperSlide)({
  width: "272px",
  userSelect: "none",
})

export const NavigationWrapper = styled("div")(() => ({
  "& .slider-nav": {
    opacity: 0,
    transition: "all 0.35s ease-out",
  },
  "&.show .slider-nav": {
    opacity: 1,
    transform: "translateX(0) translateY(-50%)",
  },
  "& .slider-nav--prev": {
    transform: "translateX(14px) translateY(-50%)",
  },
  "& .slider-nav--next": {
    transform: "translateX(-14px) translateY(-50%)",
  },
}));