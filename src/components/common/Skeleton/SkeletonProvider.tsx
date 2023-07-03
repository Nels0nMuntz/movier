import React, { PropsWithChildren } from "react";


interface ISkeletonContext {
  visible?: boolean;
}

type Props = PropsWithChildren & ISkeletonContext;

const defaultValue: ISkeletonContext = {}

export const SkeletonContext = React.createContext<ISkeletonContext>(defaultValue);

export const SkeletonProvider: React.FC<Props> = ({ visible, children }) => {
  return (
    <SkeletonContext.Provider value={{ visible }}>
      {children}
    </SkeletonContext.Provider>
  )
};
