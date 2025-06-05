import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

type UFCount = {
  uf: string;
  total: number;
};

export function useUsersByUF(): UFCount[] {
  const [usersByUF, setUsersByUF] = useState<UFCount[]>([]);

  useEffect(() => {
    async function fetchUsersByUF() {
      const snapshot = await getDocs(collection(db, "users"));
      const counts: Record<string, number> = {};

      snapshot.forEach((doc) => {
        const user = doc.data();
        const uf = user?.address?.state?.toUpperCase();
        if (user?.cpf && uf) {
          counts[uf] = (counts[uf] ?? 0) + 1;
        }
      });

      const result: UFCount[] = Object.entries(counts).map(([uf, total]) => ({
        uf,
        total,
      }));

      setUsersByUF(result);
    }

    fetchUsersByUF();
  }, []);

  return usersByUF;
}
