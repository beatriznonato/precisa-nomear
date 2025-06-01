import Icon from "../Icon/Icon";
import { imageContainer, logo, cta, image } from "./SideScreen.css";
import Background from "../../assets/images/gradient-background.png";

export const SideScreen = () => {
  return (
    <section className={imageContainer}>
      <Icon className={logo} type={"logo"} />
      <h2 className={cta}>Bem-Vindo de volta!</h2>
      <img className={image} src={Background} alt="" />
    </section>
  );
};

export default SideScreen;
