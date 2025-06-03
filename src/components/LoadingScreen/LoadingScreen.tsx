import Loader from "../Loader/Loader";
import { loadingContainer } from "./LoadingScreen.css";

export const LoadingScreen = () => {
  return (
    <div className={loadingContainer}>
      <Loader width="110" />
      <p>Carregando</p>
    </div>
  );
};

export default LoadingScreen;
