import { useContext } from "react";
import { Skeleton as MuiSkeleton, SkeletonProps } from "@mui/material";

import { SkeletonContext } from "./SkeletonProvider";


type Props = SkeletonProps;

export const Skeleton: React.FC<Props> = ({ children, ...props }) => {

  const { visible } = useContext(SkeletonContext);

  if (visible) {
    return (
      <MuiSkeleton {...props} animation="wave" >
        {children}
      </MuiSkeleton>
    )
  }

  return (
    <>{children}</>
  )
};
