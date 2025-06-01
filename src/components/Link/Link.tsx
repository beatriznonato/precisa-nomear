import { PropsWithChildren } from "react";
import { Link as ReactLink, To } from "react-router-dom";
import { link } from "./Link.css";

type LinkProps = PropsWithChildren & {
  to: To;
};
export const Link = ({ to, children }: LinkProps) => {
  return (
    <ReactLink className={link} to={to}>
      {children}
    </ReactLink>
  );
};
