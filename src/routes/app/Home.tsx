import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../firebase/AuthProvider";
import { db } from "../../firebase/FirebaseConfig";
import UserHome from "./user/UserHome";
import InstitutionHome from "./institution/InstitutionHome";

export default function Home() {
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

  return userType === "user" ? <UserHome /> : <InstitutionHome />;
}
