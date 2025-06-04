import Icon, { IconType } from "../Icon/Icon";
import {
  alertContainer,
  alertHeader,
  alertIcon,
  alertTitle,
  alertContent,
  alertValidity,
} from "./Alert.css";

type AlertProps = {
  icon?: IconType;
  title: string;
  description: string;
  validity?: string;
  className?: string;
};

const Alert = ({
  icon = "alert",
  title,
  description,
  validity,
  className,
}: AlertProps) => {
  return (
    <div className={`${alertContainer} ${className}`}>
      <div className={alertHeader}>
        <Icon type={icon} className={alertIcon} />
        <h3 className={alertTitle}>{title}</h3>
      </div>
      <p className={alertContent}>{description}</p>
      {validity && <p className={alertValidity}>Válido até: {validity}</p>}
    </div>
  );
};

export default Alert;
