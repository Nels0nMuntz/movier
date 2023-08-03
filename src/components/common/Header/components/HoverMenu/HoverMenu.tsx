import React from "react"

import { TextButton, Typography } from "components";
import { StyledTooltip } from "./styled";


interface Props {
  title: string;
  items: React.ReactNode;
}

export const HoverMenu: React.FC<Props> = ({ title, items }) => {
  return (
    <div>
      <StyledTooltip
        title={items}
      >
        <div>
          <TextButton>
            <Typography element="span" type="heading_6">{title}</Typography>
          </TextButton>
        </div>
      </StyledTooltip>
    </div>
  )
};
