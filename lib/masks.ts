/**
 * Formata um número de telefone brasileiro
 * @param value - Valor a ser formatado
 * @returns Telefone formatado no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhone(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");

  // Aplica a máscara conforme o tamanho
  if (numbers.length <= 2) {
    return numbers.length > 0 ? `(${numbers}` : "";
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    // Para celular (11 dígitos)
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
}

/**
 * Formata um CEP brasileiro
 * @param value - Valor a ser formatado
 * @returns CEP formatado no padrão XXXXX-XXX
 */
export function formatZipCode(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");

  // Aplica a máscara CEP: XXXXX-XXX
  if (numbers.length <= 5) {
    return numbers;
  } else {
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  }
}

/**
 * Formata um estado brasileiro (UF)
 * @param value - Valor a ser formatado
 * @returns Estado formatado em maiúsculas com máximo de 2 caracteres
 */
export function formatState(value: string): string {
  // Remove caracteres especiais e converte para maiúsculas
  const letters = value.replace(/[^a-zA-Z]/g, "").toUpperCase();

  // Limita a 2 caracteres
  return letters.slice(0, 2);
}




