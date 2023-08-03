import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: "140px",
    padding: `${theme.spacing(1)} 0`,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    borderRadius: 0,
  },
}));