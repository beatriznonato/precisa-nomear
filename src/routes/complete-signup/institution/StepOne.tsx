import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import FormHeader from "../../../components/Form/FormHeader/FormHeader";
import FormField from "../../../components/Form/FormField/FormField";
import Button from "../../../components/Button/Button";
import FormDropdown from "../../../components/Form/FormDropdown/FromDropdown";
import { formBtnWrapper, formElmBig, loaderContainer } from "../Step.css";
import Loader from "../../../components/Loader/Loader";
import { FormStep } from "../types";
import { formatCNPJ } from "../../../utils/formatCNPJ";
import { isValidCNPJ } from "../../../utils/isValidCNPJ";

export const StepOne = ({
  uid,
  onNext,
  onBack,
  form,
  onFormChange,
}: FormStep) => {
  const [cnpjError, setCnpjError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!("cnpj" in form)) return null; // Pegar form tipo instituicao

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "cnpj") {
      value = formatCNPJ(value);
    }

    onFormChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isValidCNPJ(form.cnpj)) {
      setCnpjError("CNPJ inválido");
      setIsSubmitting(false);
      return;
    } else {
      setCnpjError(undefined);
    }

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
      <FormHeader headline="Precisamos conhecer sua instituição!" />
      <FormField
        label="Nome da Instituição"
        name="institutionName"
        value={form.institutionName}
        onChange={handleChange}
        required
      />
      <FormField
        label="CNPJ"
        name="cnpj"
        value={form.cnpj}
        onChange={handleChange}
        required
        error={cnpjError}
      />
      <FormDropdown
        label="Tipo de Organização"
        name="organizationType"
        value={form.organizationType}
        onChange={handleChange}
        required
        options={[
          { label: "ONG", value: "ong" },
          { label: "Outra", value: "outra" },
        ]}
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

export default StepOne;
