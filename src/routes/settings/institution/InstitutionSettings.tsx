import { auth } from "../../firebase/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { db } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

type User = {
  id: string;
  name: string;
  surname: string;
  org_name: string;
  email: string;
};

const accountLabel = [
  "Nome",
  "Sobrenome",
  "Nome da Organização",
  "E-mail",
  "Senha",
];

export const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;

      console.log("Current UID:", auth.currentUser?.uid);

      try {
        const userDoc = doc(db, "users", currentUser.uid);
        const userData = await getDoc(userDoc);
        if (userData.exists()) {
          setUser({ id: userData.id, ...userData.data() } as User);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.message);
      } else {
        console.log("An error occurred");
      }
    }
  };

  return (
    <div className="">
      <div className="">
        <h1>Configurações</h1>
        <h2 className="">Detalhes da Conta</h2>
        <div className="">
          <div className="">
            {accountLabel.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
          <div className="">
            <p>{user ? user.name : ""}</p>
            <p>{user ? user.surname : ""}</p>
            <p>{user ? user.org_name : ""}</p>
            <p>{user ? user.email : ""}</p>
            <p>---</p>
          </div>
        </div>

        <Button className="" text="Sair" variant="outline" onClick={logout} />
      </div>
    </div>
  );
};

export default Settings;
