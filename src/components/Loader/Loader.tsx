// Loader.tsx
import { ThreeDots } from "react-loader-spinner";
import { themeVars } from "../../theme.css";

type LoaderProps = {
  width?: string;
};

const Loader = ({ width }: LoaderProps) => {
  return (
    <ThreeDots
      width={width ? width : "50"}
      color={themeVars.color.primary}
      radius="9"
      ariaLabel="three-dots-loading"
    />
  );
};

export default Loader;
