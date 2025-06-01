import { auth, db } from "../../firebase/FirebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Button from "../../components/Button/Button";
import FormField from "../../components/Form/FormField/FormField";
import Icon from "../../components/Icon/Icon";
import SideScreen from "../../components/SideScreen/SideScreen";
import {
  container,
  formContainer,
  logo,
  titleContainer,
  formElm,
  loginError,
  formButton,
  textAction,
  signupArea,
  loaderContainer,
} from "./SignUp.css";
import { Link } from "../../components/Link/Link";
import Loader from "../../components/Loader/Loader";

type UserData = {
  email: string;
};

// type InputField = {};

export const SignUp = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (uid: string) => {
    const userData: UserData = {
      email: form.email,
    };

    await setDoc(doc(db, "users", uid), { userData });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");
    setIsSubmitting(true);

    const newErrors: { [key: string]: string } = {};

    // Check email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      newErrors["email"] = "Formato de e-mail inválido.";
    }

    // Check password requirements
    if (form.password.length < 8 && form.password !== "") {
      newErrors["password"] = "A senha deve ter pelo menos 8 caracteres.";
    } else if (!/[a-z]/.test(form.password)) {
      newErrors["password"] =
        "A senha deve conter pelo menos uma letra minúscula.";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors["password"] =
        "A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/\d/.test(form.password)) {
      newErrors["password"] = "A senha deve conter pelo menos um número.";
    } else if (!/[@$!%*?&]/.test(form.password)) {
      newErrors["password"] =
        "A senha deve conter pelo menos um caractere especial.";
    }

    // Check passwords match
    if (form.password !== form.comfirmPassword) {
      newErrors["confirmPassword"] = "As senhas não coincidem.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await createUser(userCredential.user.uid);
      navigate(`/completar-cadastro?uid=${userCredential.user.uid}`);
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes("auth/email-already-in-use")) {
        newErrors["email"] = "Este e-mail já está em uso.";
      } else if (errorMessage.includes("auth/network-request-failed")) {
        setGeneralError(
          "Erro de rede. Verifique sua conexão com a internet e tente novamente."
        );
      } else {
        setGeneralError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className={container}>
      <SideScreen />
      <main className={formContainer}>
        <Icon className={logo} type={"logo"} />
        <div className={signupArea}>
          <div className={titleContainer}>
            <h1>Cadastro</h1>
            <p>Para utilizar a Rede do Bem, você precisa criar uma conta.</p>
          </div>
          <form
            className={formElm}
            method="post"
            action="/submit-form"
            onSubmit={handleSubmit}
          >
            <FormField
              label="E-mail"
              type="email"
              name="email"
              placeholder={"Exemplo@email.com"}
              onChange={handleChange}
              error={errors["email"]}
            />
            <FormField
              label="Senha"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha forte"
              icon={showPassword ? "eyeClosed" : "eyeOpen"}
              onIconClick={() => setShowPassword(!showPassword)}
              onChange={handleChange}
              error={errors["password"]}
            />
            <FormField
              label="Comfirmar Senha"
              name="comfirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Senha forte"
              icon={showConfirmPassword ? "eyeClosed" : "eyeOpen"}
              onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handleChange}
              error={errors["comfirmPassword"]}
            />
            <p className={loginError}>{generalError}</p>
            {isSubmitting ? (
              <div className={loaderContainer}>
                <Loader />
              </div>
            ) : (
              <Button className={formButton} type="submit">
                Continuar
              </Button>
            )}
          </form>
        </div>
        <p className={textAction}>
          Já possui uma conta? <Link to={"/login"}>Entrar</Link>
        </p>
      </main>
    </div>
  );
};
