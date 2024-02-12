import { FC, PropsWithChildren } from "react";
import { Cursor } from "./Cursor";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Cursor />
      {children}
    </div>
  );
};
