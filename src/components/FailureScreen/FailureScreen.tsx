import { loadingContainer } from "../LoadingScreen/LoadingScreen.css";

type FailureScreenProps = {
  text: string;
};

export const FailureScreen = ({ text }: FailureScreenProps) => {
  return (
    <div className={loadingContainer}>
      <p>{text}</p>
    </div>
  );
};

export default FailureScreen;
