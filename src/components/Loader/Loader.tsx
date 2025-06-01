// Loader.tsx
import { ThreeDots } from "react-loader-spinner";
import { themeVars } from "../../theme.css";

const Loader = () => {
  return (
    <ThreeDots
      width="50"
      color={themeVars.color.primary}
      radius="9"
      ariaLabel="three-dots-loading"
    />
  );
};

export default Loader;
