import { useState } from "react";

interface FormValues {
  [key: string]: string | number | Date;
}

interface FormErrors {
  [key: string]: string;
}

export default function useFormValidation<T extends FormValues>(initialValues: T) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName: string | null = event.target.getAttribute('name')
    const { value } = event.target
    if (fieldName) {
      setValues({
        ...values,
        [fieldName]: value,
      })
    }
  }

  function handleValidate(validate: () => FormErrors) {
    setErrors(validate)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, callback: () => void) {
    e.preventDefault()
    callback()
  }

  return {
    values,
    handleChangeValue,
    errors,
    handleSubmit,
    handleValidate
  }
}