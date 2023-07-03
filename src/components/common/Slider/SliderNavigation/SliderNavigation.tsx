import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { NavButton } from "./styled";
import { FAIcon } from "../../FAIcon/FAIcon";


interface Props {
  prevButtonClassName: string;
  nextButtonClassName: string;
}

export const SliderNavigation: React.FC<Props> = ({ prevButtonClassName, nextButtonClassName }) => {
  return (
    <>
      <NavButton prev className={`${prevButtonClassName} slider-nav slider-nav--prev`} title="Previous slide" aria-label="Previous slide">
        <FAIcon icon={faAngleLeft} size="3x" />
      </NavButton>
      <NavButton next className={`${nextButtonClassName} slider-nav slider-nav--next`} title="Next slide" aria-label="Next slide">
        <FAIcon icon={faAngleRight} size="3x" />
      </NavButton>
    </>
  )
};
