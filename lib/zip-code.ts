export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface AddressData {
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
}

/**
 * Busca endereço através do CEP usando a API ViaCEP
 * @param zipCode - CEP formatado ou não formatado
 * @returns Dados do endereço ou null se não encontrado
 */
export async function fetchAddressByZipCode(zipCode: string): Promise<AddressData | null> {
  // Remove formatação do CEP
  const cleanZipCode = zipCode.replace(/\D/g, "");

  // Verifica se tem 8 dígitos
  if (cleanZipCode.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
    const data: ViaCepResponse = await response.json();

    if (data.erro) {
      return null;
    }

    return {
      address: data.logradouro || "",
      neighborhood: data.bairro || "",
      city: data.localidade || "",
      state: data.uf || "",
      complement: data.complemento || undefined,
    };
  } catch (error) {
    return null;
  }
}




