import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import { FormStepOne } from "../CompleteSignUp";

export const StepOne = ({ uid, onNext }: FormStepOne) => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    nascimento: "",
    genero: "",
    telefone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", uid), { ...form }, { merge: true });
      onNext(); // vai pro proximo passo
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar dados. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Step um do usuario
      <label>
        Nome completo
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Próximo</button>
    </form>
  );
};

export default StepOne;
