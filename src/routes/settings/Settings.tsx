import { useEffect, useState } from "react";
import { useAuth } from "../../firebase/AuthProvider";
import InstitutionSettings from "./institution/InstitutionSettings";
import UserSettings from "./user/UserSettings";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

export default function Settings() {
  const { user } = useAuth();
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    async function fetchUserName() {
      try {
        if (!user) {
          setUserType("");
          return;
        }
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (!("cnpj" in userData)) {
            setUserType("user");
          }
        } else {
          setUserType("institution");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserType("Usuário");
      }
    }

    fetchUserName();
  }, [user]);

  return userType === "user" ? <UserSettings /> : <InstitutionSettings />;
}
