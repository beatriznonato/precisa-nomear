import ArrowLeftSimple from "../../assets/icons/arrow-left-simple.svg?react";
import ArrowLeft from "../../assets/icons/arrow-left.svg?react";
import Document from "../../assets/icons/document.svg?react";
import EyeOpen from "../../assets/icons/eye-open.svg?react";
import EyeClosed from "../../assets/icons/eye-closed.svg?react";
import Filter from "../../assets/icons/filter.svg?react";
import Home from "../../assets/icons/home.svg?react";
import LogOut from "../../assets/icons/log-out.svg?react";
import Settings from "../../assets/icons/settings.svg?react";
import Logo from "../../assets/icons/logo.svg?react";
import User from "../../assets/icons/user.svg?react";
import Institution from "../../assets/icons/institution.svg?react";
import Check from "../../assets/icons/check.svg?react";
import Alert from "../../assets/icons/alert.svg?react";
import Age from "../../assets/icons/age.svg?react";
import Gender from "../../assets/icons/gender.svg?react";
import Medication from "../../assets/icons/medication.svg?react";

export type IconType =
  | "alert"
  | "age"
  | "arrowLeftSimple"
  | "arrowLeft"
  | "check"
  | "document"
  | "eyeOpen"
  | "eyeClosed"
  | "filter"
  | "gender"
  | "home"
  | "logOut"
  | "medication"
  | "settings"
  | "logo"
  | "user"
  | "institution";

type IconProps = {
  type: IconType;
  size?: number | string;
  className?: string;
  onClick?: () => void;
};

const icons: Record<
  IconType,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  alert: Alert,
  age: Age,
  arrowLeftSimple: ArrowLeftSimple,
  arrowLeft: ArrowLeft,
  check: Check,
  document: Document,
  eyeOpen: EyeOpen,
  eyeClosed: EyeClosed,
  filter: Filter,
  gender: Gender,
  home: Home,
  logOut: LogOut,
  medication: Medication,
  settings: Settings,
  logo: Logo,
  user: User,
  institution: Institution,
};

const Icon: React.FC<IconProps> = ({
  type,
  size = 24,
  className,
  onClick,
}: IconProps) => {
  const Component = icons[type];

  return (
    <Component
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      onClick={onClick}
    />
  );
};

export default Icon;
