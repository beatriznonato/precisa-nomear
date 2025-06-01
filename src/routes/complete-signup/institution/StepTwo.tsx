import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import FormField from "../../../components/Form/FormField/FormField";
import FormHeader from "../../../components/Form/FormHeader/FormHeader";
import Loader from "../../../components/Loader/Loader";
import { formElmBig } from "../Step.css";
import { formBtnWrapper, loaderContainer } from "../Step.css";
import { FormStep } from "../types";

export const StepTwo = ({
  uid,
  onNext,
  onBack,
  form,
  onFormChange,
}: FormStep) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!("cnpj" in form)) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    onFormChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await setDoc(doc(db, "users", uid), { ...form }, { merge: true });
      onNext();
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <form className={formElmBig} onSubmit={handleSubmit}>
      <FormHeader headline="Quem é o responsável pela instituição?" />
      <FormField
        label="Nome Completo do Responsável"
        name="personInCharge.name"
        value={form.personInCharge.name}
        onChange={handleChange}
        required
      />
      <FormField
        label="Cargo / Função"
        name="personInCharge.position"
        value={form.personInCharge.position}
        onChange={handleChange}
        required
      />

      <div className={formBtnWrapper}>
        <Button
          type="button"
          variant="transparent"
          icon="arrowLeft"
          onClick={onBack}
        >
          Voltar
        </Button>
        {isSubmitting ? (
          <div className={loaderContainer}>
            <Loader />
          </div>
        ) : (
          <Button type="submit">Continuar</Button>
        )}
      </div>
    </form>
  );
};

export default StepTwo;
