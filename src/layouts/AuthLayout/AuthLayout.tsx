import React, { PropsWithChildren } from "react";
import { Paper, Wrapper } from "./styled";


export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Paper>
        {children}
      </Paper>
    </Wrapper>
  );
};
