import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import { FormStep } from "../types";
import Button from "../../../components/Button/Button";
import FormDropdown from "../../../components/Form/FormDropdown/FromDropdown";
import FormField from "../../../components/Form/FormField/FormField";
import FormHeader from "../../../components/Form/FormHeader/FormHeader";
import Loader from "../../../components/Loader/Loader";
import { formBtnWrapper, loaderContainer, formElm } from "../Step.css";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { isValidPhoneNumber } from "../../../utils/isValidPhoneNumber";

const relationship = [
  { label: "Pai", value: "pai" },
  { label: "Mãe", value: "mae" },
  { label: "Avô/Avó", value: "avo" },
  { label: "Irmão/Irmã", value: "irmao" },
  { label: "Filho/Filha", value: "filho" },
  { label: "Tio/Tia", value: "tio" },
  { label: "Sobrinho/Sobrinha", value: "sobrinho" },
  { label: "Primo/Prima", value: "primo" },
  { label: "Cônjuge/Parceiro(a)", value: "conjuge" },
  { label: "Amigo(a)", value: "amigo" },
  { label: "Vizinho(a)", value: "vizinho" },
  { label: "Cuidador(a)", value: "cuidador" },
  { label: "Outro", value: "outro" },
];

export const StepSix = ({
  uid,
  onNext,
  form,
  onFormChange,
  onBack,
}: FormStep) => {
  const [phoneNumberError, setPhoneNumberError] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!("cpf" in form)) return null; // Pegar form tipo user

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "emergencyContact.phoneNumber") {
      value = formatPhoneNumber(value);
    }

    onFormChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isValidPhoneNumber(form.emergencyContact.phoneNumber)) {
      setPhoneNumberError("Número de telefone inválido");
      setIsSubmitting(false);
      return;
    } else {
      setPhoneNumberError(undefined);
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
    <form className={formElm} onSubmit={handleSubmit}>
      <FormHeader headline="Quem é seu contato de emergência?" />
      <FormField
        label="Nome Completo"
        name="emergencyContact.name"
        value={form.emergencyContact.name}
        onChange={handleChange}
        required
      />
      <FormDropdown
        label="Relação"
        name="emergencyContact.relationship"
        value={form.emergencyContact.relationship}
        onChange={handleChange}
        placeholder="Selecionar"
        required
        options={relationship}
      />
      <FormField
        label="Telefone"
        name="emergencyContact.phoneNumber"
        value={form.emergencyContact.phoneNumber}
        onChange={handleChange}
        required
        error={phoneNumberError}
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

export default StepSix;
