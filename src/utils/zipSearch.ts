export interface AddressResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const fetchAddressByZip = async (
  zip: string
): Promise<AddressResponse | null> => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
    const data: AddressResponse = await response.json();

    if (data.erro) return null;

    return data;
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    return null;
  }
};
