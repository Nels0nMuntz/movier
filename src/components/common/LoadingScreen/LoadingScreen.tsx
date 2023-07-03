import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";

interface Props extends PropsWithChildren{
  visible: boolean;
}

export const LoadingScreen: React.FC<Props> = observer(({ visible, children }) => {
  return visible ? <div>Loading...</div> : <>{children}</>
});
