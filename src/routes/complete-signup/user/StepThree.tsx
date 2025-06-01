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

export const StepThree = ({
  uid,
  onNext,
  onBack,
  form,
  onFormChange,
}: FormStep) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!("cpf" in form)) return null;
  const livesAlone = form.livesAlone || "";

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onFormChange(name, value);

    if (value === "nao") {
      onFormChange("livesWith", "");
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFormChange(e.target.name, e.target.value);
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
      <FormHeader headline="Onde você mora?" />
      <FormRadio
        label="Você mora sozinho?"
        name="livesAlone"
        value={livesAlone}
        options={[
          { label: "Sim", value: "sim" },
          { label: "Não", value: "nao" },
        ]}
        onChange={handleRadioChange}
      />

      {livesAlone === "nao" && (
        <FormDropdown
          label="Com quem você mora?"
          name="livesWith"
          value={form.livesWith}
          onChange={handleDropdownChange}
          options={[
            { label: "Família", value: "familia" },
            { label: "Amigos", value: "amigos" },
            { label: "Cuidadores", value: "cuidadores" },
            { label: "Outros", value: "outros" },
          ]}
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

export default StepThree;
