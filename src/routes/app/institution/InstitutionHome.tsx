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
import {
  dashboardContainer,
  mapContainer,
  mapPositioner,
  mapWrapper,
  ufBlockChart,
  ufBlockTitleChart,
} from "./InstitutionHome.css";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import {
  ufDataGrid,
  ufBlock,
  ufBlockTitle,
  ufBlockCount,
} from "../../../components/Map/Map.css";
import { getActiveHelp } from "../../../hooks/getActiveHelp";
import { useTotalUsers } from "../../../hooks/useTotalUsers";
import { VulnerabilitiesChart } from "./VulnerabilitiesChart/VulnerabilitiesChart";
import { useVulnerabilitiesCount } from "../../../hooks/useTotalVunerabilities";
import TopUFChart from "./TopUFChart/TopUFChart";

const NavTabs: Tab[] = [
  { name: "Home", icon: "home", to: "/" },
  { name: "Configurações", icon: "settings", to: "/configuracoes" },
];

export const InstitutionHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const totalUsers = useTotalUsers();

  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const vulnerabilities = useVulnerabilitiesCount();
  const barData = Object.entries(vulnerabilities).map(([name, value]) => ({
    name,
    value,
  }));

  console.log("barData", barData);

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
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserName();
  }, [user]);

  if (isLoading) {
    return (
      <div className={container}>
        <Navigation tabs={NavTabs} className={userNav} />
        <div className={contentWrapper}>
          <header className={header}>
            <div className={headerTextWrapper}></div>
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
          <div>
            <LoadingScreen />
          </div>
        </div>
      </div>
    );
  }

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
          <div className={mapWrapper}>
            <div className={mapPositioner}>
              <Map />
            </div>
          </div>
          <div className={dashboardContainer}>
            <div className={ufDataGrid}>
              <div className={ufBlock}>
                <h3 className={ufBlockTitle}>Vulneráveis</h3>
                <div className={ufBlockCount}>{totalUsers ?? 0}</div>
              </div>

              <div className={ufBlock}>
                <h3 className={ufBlockTitle}>Pedidos de Ajuda</h3>
                <div className={ufBlockCount}>{getActiveHelp(totalUsers)}</div>
              </div>
            </div>

            <div className={ufBlock}>
              <h3 className={ufBlockTitle}>Top 5 estados</h3>
              <div className={ufBlockCount}>
                <TopUFChart />
              </div>
            </div>

            <div className={ufBlockChart}>
              <h3 className={ufBlockTitleChart}>Vulnerabilidades</h3>
              <VulnerabilitiesChart data={barData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionHome;
