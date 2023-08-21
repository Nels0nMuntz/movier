import { styled } from "@mui/material/styles";
import { Typography } from "components";


export const Wrapper = styled("section")(({ theme }) => ({
  "& .main-slider-nav-prev": {
    [theme.breakpoints.down("768")]: {
      left: "6px"
    }
  },
  "& .main-slider-nav-next": {
    [theme.breakpoints.down("768")]: {
      right: "6px",
    }
  },
}))

export const Slide = styled("div")(() => ({
  height: "750px",
}));
export const SlideBackdrop = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
  },
  "&:before": {
    content: "\"\"",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, rgb(39 40 41) 0%, rgb(39 40 41) 32%, rgba(83, 100, 141, 0) 100%)",
    zIndex: 1,
  }
}));

export const SlideContentWrap = styled("div")(({ theme }) => ({
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: "48px",
  zIndex: 1,
  [theme.breakpoints.up("768")]: {
    padding: "48px 96px",
  }
}));

export const SlideContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  "& h1": {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  "&.show": {
    transform: "translateY(0%)",
    opacity: 1,
    transition: "transform 0.75s ease-out 0.5s, opacity 0.75s ease-out 0.5s",
  },
  "&.hide": {
    transform: "translateY(5%)",
    opacity: 0,
  }
}));

export const Ganre = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.05),
  paddingBottom: theme.spacing(0.05),
  borderRadius: "14px",
}));

export const GanreOutlined = styled(Ganre)(({ theme }) => ({
  outline: `1px solid ${theme.palette.secondary.main}`,
}));

export const Badge = styled(Typography)(({ theme }) => ({
  alignSelf: "flex-start",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
  backgroundColor: theme.palette.warning.main,
  borderRadius: "0.25rem",
  color: theme.palette.grey[800],
}));

export const Actions = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up("576")]: {
    flexDirection: "row",
    marginTop: theme.spacing(3),
  }
}))