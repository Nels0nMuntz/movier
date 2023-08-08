import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";



interface Props {
  children: React.ReactElement;
  window?: () => Window;
}

export function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}