import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

type UserData = {
  cpf: string;
  address: {
    state: string;
  };
};

export const fetchUserCountByUF = async (): Promise<Record<string, number>> => {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const countByUF: Record<string, number> = {};

  usersSnapshot.forEach((doc) => {
    const data = doc.data() as UserData;

    if (data.cpf && data.address?.state) {
      const uf = data.address.state.toUpperCase();

      countByUF[uf] = (countByUF[uf] ?? 0) + 1;
    }
  });

  return countByUF;
};
