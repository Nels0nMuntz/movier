import { FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon, FontAwesomeIconProps,  } from "@fortawesome/react-fontawesome"


interface Props {
  icon: IconProp;
  color?: string;
}

export const FAIcon: FC<Props & FontAwesomeIconProps> = ({ icon, color, ...rest }) => {
  return (
    <FontAwesomeIcon 
      icon={icon} 
      color={color || "white"}
      {...rest}
    />
  )
};