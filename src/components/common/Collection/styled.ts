import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

export const Section = styled("section")(({ theme }) => ({
  padding: `${theme.spacing(3)} 0`,
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.common.white,
  transition: "background-color 0.25s",
  "&.Mui-selected": {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
  }
}));

export const TabPanelsWrap = styled("div")(({ theme }) => ({
  position: "relative",
  height: "500px",
  marginTop: theme.spacing(2),
}))

export const TabPanel = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,  
  width: "100%",
  height: "100%",
  "&.visible": {
    transform: "translateX(0px)",
    opacity: 1,
    zIndex: 1,
    transition: "all 0.35s ease-out 0.35s",
  },
  "&.hidden": {
    transform: "translateX(8px)",
    opacity: 0,
    zIndex: 0,
    transition: "all 0.35s",
  },
})
