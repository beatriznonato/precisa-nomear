import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useState } from "react";
import FormDropdown from "../../../components/Form/FormDropdown/FromDropdown";
import FormField from "../../../components/Form/FormField/FormField";
import FormHeader from "../../../components/Form/FormHeader/FormHeader";
import Loader from "../../../components/Loader/Loader";
import {
  formBtnWrapper,
  loaderContainer,
  fieldset,
  formElm,
  smallField,
} from "../Step.css";
import { FormStep } from "../types";
import Button from "../../../components/Button/Button";
import { formatZip } from "../../../utils/formatZip";
import { isValidZip } from "../../../utils/isValidZip";
import { states } from "../institution/StepThree";
import { fetchAddressByZip } from "../../../utils/zipSearch";

export const StepTwo = ({
  uid,
  onNext,
  onBack,
  form,
  onFormChange,
}: FormStep) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zipError, setZipError] = useState<string | undefined>(undefined);

  if (!("cpf" in form)) return null;

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "address.zip") {
      value = formatZip(value);
      onFormChange(name, value);

      const cleanedZip = value.replace(/\D/g, "");

      if (cleanedZip.length === 8 && isValidZip(cleanedZip)) {
        const addressData = await fetchAddressByZip(cleanedZip);

        if (addressData) {
          onFormChange("address.street", addressData.logradouro || "");
          onFormChange("address.district", addressData.bairro || "");
          onFormChange("address.city", addressData.localidade || "");
          onFormChange("address.state", addressData.uf || "");
          setZipError(undefined);
        } else {
          setZipError("CEP não encontrado");
        }
      }

      return;
    }

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
      <FormHeader headline="Onde você mora?" />
      <FormField
        label="CEP"
        name="address.zip"
        value={form.address.zip}
        onChange={handleChange}
        error={zipError}
        required
      />
      <fieldset className={fieldset}>
        <FormField
          label="Logradouro"
          name="address.street"
          value={form.address.street}
          onChange={handleChange}
          required
        />
        <FormField
          label="Número"
          name="address.number"
          type="number"
          value={form.address.number}
          onChange={handleChange}
          required
          className={smallField}
        />
      </fieldset>

      <FormField
        label="Complemento"
        name="address.additionalAddressInfo"
        value={form.address.additionalAddressInfo}
        onChange={handleChange}
        required={false}
      />

      <FormField
        label="Bairro"
        name="address.district"
        value={form.address.district}
        onChange={handleChange}
        required
      />

      <fieldset className={fieldset}>
        <FormField
          label="Cidade"
          name="address.city"
          value={form.address.city}
          onChange={handleChange}
          required
        />
        <FormDropdown
          label="Estado"
          name="address.state"
          value={form.address.state}
          onChange={handleChange}
          placeholder="UF"
          required
          className={smallField}
          options={states}
        />
      </fieldset>

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
