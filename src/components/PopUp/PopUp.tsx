import { useEffect, useRef } from "react";
import Button from "../Button/Button";
import Icon, { IconType } from "../Icon/Icon";
import {
  btnWrapper,
  iconWrapper,
  popupBtn,
  popupDialog,
  popupHeadline,
  popupIcon,
  popupSubline,
} from "./PopUp.css";

type PopUpProps = {
  icon: IconType;
  headline: string;
  subline: string;
  buttons: [
    { label: string; onClick: () => void },
    { label: string; onClick: () => void }
  ];
};

export const PopUp = ({ icon, headline, subline, buttons }: PopUpProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <dialog ref={dialogRef} className={popupDialog}>
      <div className={iconWrapper}>
        <Icon className={popupIcon} type={icon} />
      </div>
      <h3 className={popupHeadline}>{headline}</h3>
      <p className={popupSubline}>{subline}</p>
      <div className={btnWrapper}>
        {buttons.map((button, idx) => (
          <Button
          className={popupBtn}
            variant={idx === 0 ? "outline" : "default"}
            key={idx}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </dialog>
  );
};

export default PopUp;
