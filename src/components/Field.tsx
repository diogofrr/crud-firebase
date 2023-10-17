'use client'

import { FormErrors } from "@/hooks/useFormValidation"
import { ErrorIcon } from "./Icons"

interface IFieldProps {
  text: string
  type: 'text' | 'number' | 'date' | 'tel' | 'email' | 'password'
  value?: any
  readOnly?: boolean
  onChange?: (e: React.FormEvent<HTMLInputElement>, inputMaskValue: string | null) => void
  name: string
  id: string
  min?: string
  max?: string
  placeholder?: string
  validation?: (errors: FormErrors, value: any) => void
  defaultValue?: any
  inputMask?: (event: React.FormEvent<HTMLInputElement>) => string
  errors: FormErrors
  baseColor?: "primary" | "secondary"
}

export default function Field({ text, type, defaultValue, value, readOnly = false, onChange, name, id, errors, validation, placeholder = "", min = "", max = "", inputMask, baseColor = "primary" }: IFieldProps) {
  const colors = {
    primary: {
      text: 'text-chetwodeBlue',
      border: 'border-chetwodeBlue'
    },
    secondary: {
      text: 'text-tuna',
      border: 'border-tuna'
    }
  }

  return (
    <div className="flex flex-col mb-4">
      <label className={`${errors[name] ? 'text-red-600' : readOnly ? 'text-gray-500' : colors[baseColor].text} font-medium relative top-3 left-4 bg-white px-2 max-w-max rounded-lg`}>{text}</label>
      <div className="w-full">
        <input
          className={`${readOnly ? 'text-gray-500' : 'text-black'} border-2 ${errors[name] ? 'border-red-600' : readOnly ? 'border-gray-500' : colors[baseColor].border} rounded-2xl p-4 focus:outline-none h-15 w-full`}
          type={type}
          value={value}
          defaultValue={defaultValue}
          readOnly={readOnly}
          min={min}
          max={max}
          onChange={(e) => {
            onChange?.(e, inputMask?.(e) ?? null)
            validation?.(errors, e.target.value)
          }}
          name={name}
          id={id}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && <p className="text-red-600 pt-2"><ErrorIcon className="inline" /> {errors[name]}</p>}
    </div>
  )
}