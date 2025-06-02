import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import FormHeader from "../../../components/Form/FormHeader/FormHeader";
import Loader from "../../../components/Loader/Loader";
import { formElm } from "../CompleteSignUp.css";
import { formBtnWrapper, loaderContainer } from "../Step.css";
import { FormStep } from "../types";
import FormDropdown from "../../../components/Form/FormDropdown/FromDropdown";
import FormRadio from "../../../components/Form/FormRadio/FormRadio";
import FormField from "../../../components/Form/FormField/FormField";

export const StepFour = ({
  uid,
  onNext,
  onBack,
  form,
  onFormChange,
}: FormStep) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!("cpf" in form)) return null;
  const hasDisability = form.hasDisability || "";
  const needsMedicalEquip = form.needsMedicalEquip || "";

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onFormChange(name, value);

    if (name === "hasDisability" && value === "nao") {
      onFormChange("disability", "");
    }

    if (name === "needsMedicalEquip" && value === "nao") {
      onFormChange("medicalEquip", "");
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFormChange(e.target.name, e.target.value);
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
        label="Você possui alguma deficiência?"
        name="hasDisability"
        value={hasDisability}
        options={[
          { label: "Sim", value: "sim" },
          { label: "Não", value: "nao" },
        ]}
        onChange={handleRadioChange}
      />

      {hasDisability === "sim" && (
        <FormDropdown
          label="Qual?"
          name="disability"
          value={form.disability}
          onChange={handleDropdownChange}
          options={[
            { label: "Deficiência física", value: "fisica" },
            { label: "Deficiência visual", value: "visual" },
            { label: "Deficiência auditiva", value: "auditiva" },
            { label: "Deficiência cognitiva", value: "cognitiva" },
            { label: "Doença ou condição crônica", value: "cronica" },
          ]}
        />
      )}

      <FormRadio
        label="Você usa algum equipamento médico essencial?"
        name="needsMedicalEquip"
        value={needsMedicalEquip}
        options={[
          { label: "Sim", value: "sim" },
          { label: "Não", value: "nao" },
        ]}
        onChange={handleRadioChange}
      />

      {needsMedicalEquip === "sim" && (
        <FormField
          label="Quais?"
          name="medicalEquip"
          value={form.medicalEquip}
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

export default StepFour;
