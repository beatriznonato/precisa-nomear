import { useNavigate } from "react-router-dom";
import Icon, { IconType } from "../Icon/Icon";
import NavItem, { NavTo } from "../NavItem/NavItem";
import {
  logoutContainer,
  logoutIcon,
  logoutText,
  navContaniner,
  navLogo,
  navSubtitle,
  navUl,
} from "./Navigation.css";
import PopUp from "../PopUp/PopUp";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { FirebaseError } from "firebase/app";

export type Tab = {
  name: string;
  icon: IconType;
  to: NavTo;
};

type SidebarProps = {
  tabs: Tab[];
};

export const Navigation = ({ tabs }: SidebarProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.message);
      } else {
        console.log("An error occurred");
      }
    }
  };

  return (
    <nav className={navContaniner}>
      <Icon type="logo" className={navLogo} />
      <ul className={navUl}>
        <p className={navSubtitle}>Geral</p>
        {tabs.map((tab, idx) => (
          <li key={idx}>
            <NavItem to={tab.to} icon={tab.icon}>
              {tab.name}
            </NavItem>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setDialogOpen(true);
          console.log(dialogOpen);
        }}
        className={logoutContainer}
      >
        <Icon className={logoutIcon} type="logOut" />
        <p className={logoutText}>Sair</p>
      </button>
      {dialogOpen && (
        <PopUp
          icon="logOut"
          headline="Já vai?"
          subline="Tem certeza que deseja sair de sua conta? "
          buttons={[
            { label: "Cancelar", onClick: () => setDialogOpen(false) },
            { label: "Tenho", onClick: logout },
          ]}
        />
      )}
    </nav>
  );
};

export default Navigation;
