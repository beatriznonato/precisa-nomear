import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import {
  button,
  buttonWrapper,
  buttonText,
  buttonIcon,
  buttonTransparent,
  buttonDefault,
  buttonCircle,
} from "./Button.css";
import Icon, { IconType } from "../Icon/Icon";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  onClick?: () => void;
  variant?: "default" | "transparent" | "circle";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon?: IconType;
  className?: string;
};

const Button = ({
  onClick,
  variant = "default",
  type = "button",
  icon,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const variantStyle =
    variant === "transparent"
      ? buttonTransparent
      : variant === "circle"
      ? buttonCircle
      : buttonDefault;

  return (
    <button
      {...rest}
      type={type}
      className={`${button} ${variantStyle} ${className}`}
      onClick={onClick}
    >
      <div className={buttonWrapper}>
        {icon && <Icon className={buttonIcon} type={icon} />}
        <p className={buttonText}>{children}</p>
      </div>
    </button>
  );
};

export default Button;
