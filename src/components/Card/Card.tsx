import Icon, { IconType } from "../Icon/Icon";
import { container, iconWrapper } from "./Card.css";

type CardProps = {
  text: string;
  icon: IconType;
  className?: string;
  onClick?: () => void;
};

export const Card = ({ text, icon, className, onClick }: CardProps) => {
  return (
    <button
      type="button"
      className={`${container} ${className}`}
      onClick={onClick}
    >
      <div className={iconWrapper}>
        <Icon type={icon} />
      </div>
      <p>{text}</p>
    </button>
  );
};

export default Card;
