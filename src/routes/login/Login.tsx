import {
  container,
  titleContainer,
  formElm,
  formContainer,
  formButton,
  textAction,
  loginError,
  logo,
} from "./Login.css";
import { auth } from "../../firebase/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/Form/FormField/FormField";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { Link } from "../../components/Link/Link";
import SideScreen from "../../components/SideScreen/SideScreen";
import Icon from "../../components/Icon/Icon";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Check if either the email or password field is empty
    if (email === "" || password === "") {
      setError("Preencha todos os campos.");
      return;
    }

    // Sign in then navigate to the homepage
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate("/");
    } catch (error: unknown) {
      //Arrumar depois  Error (auth/invalid-credential).
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className={container}>
      <SideScreen />
      <main className={formContainer}>
        <Icon className={logo} type={"logo"} />
        <div className={titleContainer}>
          <h1>Login</h1>
          <p>Por favor, entre com sua conta.</p>
        </div>
        <form
          className={formElm}
          method="post"
          action="/submit-form"
          onSubmit={handleSignIn}
        >
          <FormField
            label="E-mail"
            type="email"
            name="email"
            placeholder={"Exemplo@email.com"}
          />
          <FormField
            label="Senha"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha forte"
            icon={showPassword ? "eyeClosed" : "eyeOpen"}
            onIconClick={() => setShowPassword(!showPassword)}
          />
          <p className={loginError}>{error}</p>
          <Button
            className={formButton}
            type="submit"
            onClick={() => handleSignIn}
          >
            Login
          </Button>
        </form>
        <p className={textAction}>
          Ainda não possui uma conta? <Link to={"/signup"}>Faça uma já!</Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
