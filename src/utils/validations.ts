import { FormErrors } from "@/hooks/useFormValidation";
import { parseDateString } from "./formatDate";

export const telFieldValidation = (errors: FormErrors, value: string) => {
  const updatedErrors = errors;

  if (value.length < 11) {
    updatedErrors.tel = "Por favor, insira um telefone válido.";
  } else {
    updatedErrors.tel = "";
  }

  return updatedErrors;
};

export const nameFieldValidation = (errors: FormErrors, value: string) => {
  const updatedErrors = errors;

  if (value === "") {
    updatedErrors.name = "Por favor, insira um nome válido.";
  } else {
    updatedErrors.name = "";
  }

  return updatedErrors;
};

export const birthdatFieldValidation = (errors: FormErrors, value: string) => {
  const updatedErrors = errors;

  const updatedValue = parseDateString(value);

  if (
    updatedValue >= new Date() ||
    updatedValue.toString() === "Invalid Date"
  ) {
    updatedErrors.birthday = "Por favor, insira uma data válida.";
  } else {
    updatedErrors.birthday = "";
  }

  return updatedErrors;
};
export const emailFieldValidation = (errors: FormErrors, value: string) => {
  const updatedErrors = errors;

  if (value === "") {
    updatedErrors.email = "Por favor, insira um email válido.";
  } else {
    updatedErrors.email = "";
  }

  return updatedErrors;
};

export const passwordFieldValidation = (errors: FormErrors, value: string) => {
  const updatedErrors = errors;

  if (value.length < 6) {
    updatedErrors.password = "Sua senha deve conter pelo menos 6 caracteres.";
  } else if (value.length > 24) {
    updatedErrors.password = "Sua senha deve ter menos de 24 caracteres.";
  } else {
    updatedErrors.password = "";
  }

  return updatedErrors;
};

export const confirmPasswordFieldValidation = (
  errors: FormErrors,
  value: string,
  comparativeValue: string
) => {
  const updatedErrors = errors;

  if (value !== comparativeValue) {
    updatedErrors.confirmPassword = "As senhas não conferem.";
  } else {
    updatedErrors.confirmPassword = "";
  }

  return updatedErrors;
};

export const requiredFieldValidation = (errors: FormErrors, value: string) => {
  const updatedErrors = errors;

  if (value === "") {
    updatedErrors.password = "Por favor, insira sua senha.";
  } else {
    updatedErrors.password = "";
  }

  return updatedErrors;
};
