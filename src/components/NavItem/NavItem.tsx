import { PropsWithChildren } from "react";
import Icon, { IconType } from "../Icon/Icon";
import { Link } from "../Link/Link";
import { container, linkIcon, linkText } from "./NavItem.css";

export type NavTo =
  | "/"
  | "/login"
  | "/signup"
  | "/signup-success"
  | "/completar-cadastro"
  | "/dados"
  | "/configuracoes";

type SidebarProps = PropsWithChildren & {
  to:
    | "/"
    | "/login"
    | "/signup"
    | "/signup-success"
    | "/completar-cadastro"
    | "/dados"
    | "/configuracoes";
  icon: IconType;
};

export const NavItem = ({ to, icon, children }: SidebarProps) => {
  return (
    <Link to={to} className={container}>
      <Icon className={linkIcon} type={icon} />
      <p className={linkText}>{children}</p>
    </Link>
  );
};

export default NavItem;
