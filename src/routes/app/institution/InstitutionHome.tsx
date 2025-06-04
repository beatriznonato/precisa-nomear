import Navigation, { Tab } from "../../../components/Navigation/Navigation";
import Icon from "../../../components/Icon/Icon";

import ProfilePhoto from "../../../assets/images/profile-photo.png";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useAuth } from "../../../firebase/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  container,
  userNav,
  contentWrapper,
  header,
  headerTextWrapper,
  upperNav,
  settingsIcon,
  profilePhoto,
} from "../user/UserHome.css";
import Map from "../../../components/Map/Map";
import { mapContainer } from "./InstitutionHome.css";

const NavTabs: Tab[] = [
  { name: "Home", icon: "home", to: "/" },
  { name: "Configurações", icon: "settings", to: "/configuracoes" },
];

export const InstitutionHome = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserName() {
      try {
        if (!user) {
          setUserName("Usuário");
          return;
        }
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const fullName = userData.personInCharge.name || "";
          const firstName = fullName.split(" ")[0];
          setUserName(firstName);
        } else {
          setUserName("Usuário");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserName("Usuário");
      }
    }

    fetchUserName();
  }, [user]);

  return (
    <div className={container}>
      <Navigation tabs={NavTabs} className={userNav} />
      <div className={contentWrapper}>
        <header className={header}>
          <div className={headerTextWrapper}>
            <h3>Olá, {userName}!</h3>
            <p>Tudo certo por aí?</p>
          </div>
          <nav className={upperNav}>
            <Icon
              className={settingsIcon}
              type="settings"
              onClick={() => navigate("/configuracoes")}
            />
            <div className={profilePhoto}>
              <img style={{ width: "100%" }} src={ProfilePhoto} alt="" />
            </div>
          </nav>
        </header>
        <div className={mapContainer}>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default InstitutionHome;
