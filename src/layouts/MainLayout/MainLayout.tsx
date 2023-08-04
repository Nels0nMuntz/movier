import { PropsWithChildren } from "react"
import { observer } from "mobx-react-lite";

import { LoadingScreen, FailScreen, Header, Footer, HeaderMode } from "components";
import { Grid, Main } from "./styled";


interface Props extends PropsWithChildren {
  isLoading?: boolean;
  isFaild?: boolean;
  headerMode?: HeaderMode;
}

export const MainLayout: React.FC<Props> = observer(function MainLayout({ isLoading = false, isFaild = false, headerMode, children }) {
  return (
    <LoadingScreen visible={isLoading}>
      <FailScreen visible={isFaild}>
        <Grid>
          <Header mode={headerMode} />
          <Main>{children}</Main>
          <Footer />
        </Grid>
      </FailScreen>
    </LoadingScreen>
  )
});
