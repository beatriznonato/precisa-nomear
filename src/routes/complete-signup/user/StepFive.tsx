import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import FormHeader from "../../../components/Form/FormHeader/FormHeader";
import Loader from "../../../components/Loader/Loader";
import { formElm } from "../CompleteSignUp.css";
import { formBtnWrapper, loaderContainer } from "../Step.css";
import { FormStep } from "../types";
import FormRadio from "../../../components/Form/FormRadio/FormRadio";
import FormField from "../../../components/Form/FormField/FormField";

export const StepFive = ({
  uid,
  onNext,
  onBack,
  form,
  onFormChange,
}: FormStep) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!("cpf" in form)) return null;
  const takesMedication = form.takesMedication || "";

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onFormChange(name, value);

    if (name === "takesMedication" && value === "nao") {
      onFormChange("medication", "");
    }
  };

  const handleInputChange = (
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
    <form className={formElm} onSubmit={handleSubmit}>
      <FormHeader headline="Condições de saúde e mobilidade" />
      <FormRadio
        label="Toma medicação contínua?"
        name="takesMedication"
        value={takesMedication}
        options={[
          { label: "Sim", value: "sim" },
          { label: "Não", value: "nao" },
        ]}
        onChange={handleRadioChange}
      />

      {takesMedication === "sim" && (
        <FormField
          label="Quais?"
          name="medication"
          value={form.medication}
          onChange={handleInputChange}
          required
          error="Separe os medicamentos com uma vírgula."
        />
      )}

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

export default StepFive;
