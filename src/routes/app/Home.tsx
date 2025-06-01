import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth } from "../../firebase/FirebaseConfig";
import { signOut } from "firebase/auth";

export default function Home() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return <Button onClick={logout}>Logout</Button>;
}
