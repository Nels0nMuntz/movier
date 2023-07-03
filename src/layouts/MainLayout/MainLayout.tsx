import { PropsWithChildren } from "react"
import { observer } from "mobx-react-lite";

import { LoadingScreen, FailScreen, Header } from "components";


interface Props extends PropsWithChildren {
  isLoading?: boolean;
  isFaild?: boolean;
}

export const MainLayout: React.FC<Props> = observer(({ isLoading = false, isFaild = false, children }) => {
  return (
    <LoadingScreen visible={isLoading}>
      <FailScreen visible={isFaild}>
        <Header />
        <>{children}</>
      </FailScreen>
    </LoadingScreen>
  )
});
