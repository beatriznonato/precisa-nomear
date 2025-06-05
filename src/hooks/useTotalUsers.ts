import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

export function useTotalUsers() {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalUsers() {
      const snapshot = await getDocs(collection(db, "users"));
      let count = 0;

      snapshot.forEach((doc) => {
        const user = doc.data();
        if (user?.cpf) count++;
      });

      setTotalUsers(count);
    }

    fetchTotalUsers();
  }, []);

  return totalUsers;
}
