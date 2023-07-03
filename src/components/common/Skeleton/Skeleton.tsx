import { PropsWithChildren, useContext } from "react";
import { Skeleton as MuiSkeleton } from "@mui/material";

import { SkeletonContext } from "./SkeletonProvider";


interface Props extends PropsWithChildren {
  variant?: "text" | "rectangular" | "rounded" | "circular"
}

export const Skeleton: React.FC<Props> = ({ variant, children }) => {

  const { visible } = useContext(SkeletonContext);

  if (visible) {
    return (
      <MuiSkeleton variant={variant} animation="wave" >
        {children}
      </MuiSkeleton>
    )
  }

  return (
    <>{children}</>
  )
};
