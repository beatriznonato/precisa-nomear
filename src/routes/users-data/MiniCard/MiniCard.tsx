import Icon, { IconType } from "../../../components/Icon/Icon";
import {
  cardLabel,
  cardText,
  cardValue,
  iconContainer,
  miniCard,
} from "./MiniCard.css";

type MiniCardProps = {
  icon: IconType;
  label: string;
  value: string | number;
};

const MiniCard = ({ icon, label, value }: MiniCardProps) => {
  return (
    <div className={miniCard}>
      <div className={iconContainer}>
        <Icon type={icon} />
      </div>
      <div className={cardText}>
        <p className={cardLabel}>{label}</p>
        <p className={cardValue}>{value}</p>
      </div>
    </div>
  );
};

export default MiniCard;
