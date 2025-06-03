import { formatZip } from "./formatZip";
import { isValidZip } from "./isValidZip";
import { fetchAddressByZip } from "./zipSearch";

export const autoFillAddressFromZip = async (
  zip: string,
  onFormChange: (field: string, value: string) => void,
  setZipError: (error: string | undefined) => void,
  setIsZipValid?: (valid: boolean) => void
) => {
  const formattedZip = formatZip(zip);
  onFormChange("address.zip", formattedZip);

  const cleanedZip = formattedZip.replace(/\D/g, "");

  if (cleanedZip.length === 8 && isValidZip(cleanedZip)) {
    const addressData = await fetchAddressByZip(cleanedZip);

    if (addressData) {
      onFormChange("address.street", addressData.logradouro || "");
      onFormChange("address.district", addressData.bairro || "");
      onFormChange("address.city", addressData.localidade || "");
      onFormChange("address.state", addressData.uf || "");
      setZipError(undefined);
      setIsZipValid?.(true); // <-- chamada segura
    } else {
      onFormChange("address.street", "");
      onFormChange("address.district", "");
      onFormChange("address.city", "");
      onFormChange("address.state", "");
      setZipError("CEP não encontrado");
      setIsZipValid?.(false); // <-- chamada segura
    }
  } else {
    setIsZipValid?.(false); // <-- chamada segura
  }
};
