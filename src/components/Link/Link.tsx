import { PropsWithChildren } from "react";
import { Link as ReactLink, To } from "react-router-dom";
import { link } from "./Link.css";

type LinkProps = PropsWithChildren & {
  to: To;
  className?: string;
};
export const Link = ({ to, className, children }: LinkProps) => {
  return (
    <ReactLink className={`${link} ${className}`} to={to}>
      {children}
    </ReactLink>
  );
};
