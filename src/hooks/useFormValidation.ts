import { useCallback, useState } from "react";

interface FormValues {
  [key: string]: string | number | Date;
}

interface FormErrors {
  [key: string]: string;
}

export default function useFormValidation<T extends FormValues>(initialValues: T) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChangeValue = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const fieldName: string | null = event.currentTarget.getAttribute('name')
    const { value } = event.currentTarget
    if (fieldName) {
      setValues({
        ...values,
        [fieldName]: value,
      })
    }
  }, [values])

  const handleValidate = useCallback((validate: () => FormErrors) => {
    setErrors(validate)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>, callback: () => void) => {
    e.preventDefault()
    callback()
  }, [])

  return {
    values,
    handleChangeValue,
    errors,
    handleSubmit,
    handleValidate
  }
}