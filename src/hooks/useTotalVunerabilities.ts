import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

export function useVulnerabilitiesCount() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, "users"));

      const categories = [
        "fisica",
        "visual",
        "auditiva",
        "cronica",
        "cognitiva",
      ];
      const result: Record<string, number> = Object.fromEntries(
        categories.map((c) => [capitalize(c), 0])
      );

      snapshot.forEach((doc) => {
        const user = doc.data();
        const raw = user.disability?.toLowerCase().trim();

        if (categories.includes(raw)) {
          const label = capitalize(raw);
          result[label] += 1;
        }
      });

      setCounts(result);
    }

    fetchData();
  }, []);

  return counts;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
