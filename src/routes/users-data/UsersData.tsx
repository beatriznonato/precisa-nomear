import ProfilePhoto from "../../assets/images/profile-photo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Navigation, { Tab } from "../../components/Navigation/Navigation";
import { useAuth } from "../../firebase/AuthProvider";
import {
  header,
  container,
  userNav,
  contentWrapper,
  headerTextWrapper,
  upperNav,
  settingsIcon,
  profilePhoto,
} from "../app/user/UserHome.css";
import { goBack, goBackIcon } from "../settings/user/UserSettings.css";
import Icon from "../../components/Icon/Icon";
import { useUsersWithCPF } from "../../hooks/useUsersWithCPF";
import { UserFormFields } from "../complete-signup/types";
import Filters, { FilterOptions, FiltersType } from "./Filters/Filters";
import UserTable from "./Table/UserTable";
import SideLayer from "./SideLayer/SideLayer";
import { tableWrapper } from "./UsersData.css";

const NavTabs: Tab[] = [
  { name: "Home", icon: "home", to: "/" },
  { name: "Dados", icon: "document", to: "/dados" },
  { name: "Configurações", icon: "settings", to: "/configuracoes" },
];

const UsersData = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { users } = useUsersWithCPF();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>({
    city: "",
    state: "",
    disability: "",
  });
  const [selectedUser, setSelectedUser] = useState<UserFormFields | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    cities: [] as string[],
    states: [] as string[],
    disabilities: [] as string[],
  });

  useEffect(() => {
    async function fetchUserName() {
      try {
        if (!user) {
          return;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserName();
  }, [user]);

  useEffect(() => {
    const cities = Array.from(
      new Set(users.map((u) => u.address.city).filter(Boolean))
    );
    const states = Array.from(
      new Set(users.map((u) => u.address.state).filter(Boolean))
    );
    const disabilities = Array.from(
      new Set(users.map((u) => u.disability).filter(Boolean))
    );

    setFilterOptions({ cities, states, disabilities });
  }, [users]);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchCity =
        filters.city === "" || user.address.city === filters.city;
      const matchState =
        filters.state === "" || user.address.state === filters.state;
      const matchDisability =
        filters.disability === "" || user.disability === filters.disability;
      return matchCity && matchState && matchDisability;
    });
    setFilteredUsers(filtered);
  }, [filters, users]);

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
          <h2 className={goBack}>
            <Icon
              className={goBackIcon}
              onClick={() => navigate("/")}
              type="arrowLeft"
            />
            Dados
          </h2>
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

        <Filters
          filters={filters}
          filterOptions={filterOptions}
          setFilters={setFilters}
        />

        <div className={tableWrapper}>
          <UserTable users={filteredUsers} setSelectedUser={setSelectedUser} />
        </div>

        <SideLayer
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </div>
  );
};

export default UsersData;
