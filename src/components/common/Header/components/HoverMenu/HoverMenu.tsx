import React from "react";
import { TooltipProps } from "@mui/material/Tooltip";

import { TextButton, Typography } from "components";
import { StyledTooltip } from "./styled";


interface Props {
  items: React.ReactNode;
  title?: string;
  placement?: TooltipProps["placement"];
  children?: React.ReactElement;
}

export const HoverMenu: React.FC<Props> = React.memo(function HoverMenu({ title, items, placement, children }) {
  return (
    <div>
      <StyledTooltip
        title={items}
        placement={placement}
      >
        <div>
          {children || (
            <TextButton>
              <Typography element="span" type="heading_6">{title}</Typography>
            </TextButton>
          )}
        </div>
      </StyledTooltip>
    </div>
  )
});
