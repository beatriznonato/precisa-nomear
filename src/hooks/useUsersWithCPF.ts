import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { UserFormFields } from "../routes/complete-signup/types";

export type UserData = UserFormFields & { id: string };

export function useUsersWithCPF() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "users"));

        const usersWithCPF: UserData[] = snapshot.docs
          .map((doc) => {
            const data = doc.data() as UserFormFields;
            return {
              id: doc.id, // UID do Firebase
              ...data,
            };
          })
          .filter((user) => !!user.cpf); // Apenas usuários com CPF

        setUsers(usersWithCPF);
      } catch (error) {
        console.error("Erro ao buscar usuários com CPF:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading };
}
