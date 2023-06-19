import { styled } from "@mui/material/styles";
import { Typography } from "components";

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
  },
  "&:before": {
    content: "\"\"",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, rgb(39 40 41) 0%, rgb(39 40 41) 35%, rgba(83, 100, 141, 0) 100%)",
    zIndex: 1,
  }
}));

export const SlideContentWrap = styled("div")({
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: "48px 96px",
  zIndex: 1,
});

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
    transform: "translateY(10%)",
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

export const NavButton = styled("button")<{ prev?: boolean, next?: boolean }>(({ prev, next }) => ({
  position: "absolute",
  top: "50%",
  left: `${prev ? "24px" : "auto"}`,
  right: `${next ? "24px" : "auto"}`,
  transform: "translateY(-50%)",
  zIndex: 1,
}));

export const Badge = styled(Typography)(({ theme }) => ({
  alignSelf: "flex-start",
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.25)}`,
  backgroundColor: theme.palette.warning.main,
  borderRadius: "0.25rem",
  color: theme.palette.grey[800],
}))