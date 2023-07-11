import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";

import { Wrapper } from "./styled";

interface Props extends PropsWithChildren{
  visible: boolean;
}

export const LoadingScreen: React.FC<Props> = observer(({ visible, children }) => {
  return (
    <Wrapper visible={visible}>
      <div className="loader-wrapper">
        <div className="loader"></div>
        <div className="loader-section loader-section--left"></div>
        <div className="loader-section loader-section--right"></div>
      </div>
      {!visible ? <>{children}</> : null}
    </Wrapper>
  )
});
