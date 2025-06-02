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
import { formatCPF } from "../../../utils/formatCPF";
import { isValidCPF } from "../../../utils/isValidCPF";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { isValidPhoneNumber } from "../../../utils/isValidPhoneNumber";

export const StepOne = ({
  uid,
  onNext,
  form,
  onFormChange,
  onBack,
}: FormStep) => {
  const [cpfError, setCpfError] = useState<string | undefined>(undefined);
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

    if (name === "cpf") {
      value = formatCPF(value);
    }

    if (name === "phoneNumber") {
      value = formatPhoneNumber(value);
    }

    onFormChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isValidCPF(form.cpf)) {
      setCpfError("CPF inválido");
      setIsSubmitting(false);
      return;
    } else {
      setCpfError(undefined);
    }

    if (!isValidPhoneNumber(form.phoneNumber)) {
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
      <FormHeader headline="Precisamos conhecer você!" />
      <FormField
        label="Nome Completo"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <FormField
        label="CPF"
        name="cpf"
        value={form.cpf}
        onChange={handleChange}
        required
        error={cpfError}
      />
      <FormField
        label="Data de Nascimento"
        name="birthDate"
        value={form.birthDate}
        type="date"
        onChange={handleChange}
        required
      />
      <FormDropdown
        label="Gênero"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
        options={[
          { label: "Feminino", value: "feminino" },
          { label: "Masculino", value: "masculino" },
          { label: "Prefiro não informar", value: "prefereNaoDizer" },
          { label: "Outro", value: "outro" },
        ]}
      />
      <FormField
        label="Telefone"
        name="phoneNumber"
        value={form.phoneNumber}
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

export default StepOne;
