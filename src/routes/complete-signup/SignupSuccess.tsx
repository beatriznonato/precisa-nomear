import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import { header, logo } from "./CompleteSignUp.css";
import FormHeader from "../../components/Form/FormHeader/FormHeader";
import { successIcon, successIconWrapper, successContainer } from "./Step.css";

export const SignUpSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className={header}>
        <Icon className={logo} type="logo" />
      </header>
      <main className={successContainer}>
        <div className={successIconWrapper}>
          <Icon className={successIcon} type="check" />
        </div>
        <FormHeader
          headline="Finalizado!"
          subline="O seu cadastro foi realizado com sucesso."
          textAlign="center"
        />
        <Button onClick={() => navigate("/")}>Para a plataforma</Button>
      </main>
    </>
  );
};

export default SignUpSuccess;
