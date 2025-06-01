import "./Navigation.css";

type SidebarProps = {
  tab: "home" | "settings";
};

export const Navigation = ({ tab }: SidebarProps) => {
  // const navigate = useNavigate();

  return (
    <div className="navigation-menu-container">
      <div className="navigation-main-menu">
        {/* <IconButton
          isActive={tab === "home"}
          onClick={() => navigate("/dashboard")}
        /> */}
      </div>
    </div>
  );
};

export default Navigation;
