import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";

interface Props extends PropsWithChildren{
  visible: boolean;
}

export const FailScreen: React.FC<Props> = observer(({ visible, children }) => {
  return visible ? <div>Something went wrong. Try later.</div> : <>{children}</>
});