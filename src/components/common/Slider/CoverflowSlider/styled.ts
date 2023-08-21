import { styled } from "@mui/material/styles";


export const SliderWrapper = styled("div")(() => ({
  width: "100%",
  marginTop: "80px",

  "& .swiper-slide": {
    "& .large-card-btn": {
      pointerEvents: "none",
    },
  },
  "& .swiper-slide.swiper-slide-active": {
    "& .large-card-btn": {
      pointerEvents: "auto",
    },
  },
}));

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