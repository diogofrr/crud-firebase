'use client'

import { FormErrors } from "@/hooks/useFormValidation"
import { ErrorIcon, EyeIcon, EyeSlashIcon } from "./Icons"
import { useState } from "react"

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
  validation?: (errors: FormErrors, value: any, comparativeValue ?: any) => void
  defaultValue?: any
  inputMask?: (event: React.FormEvent<HTMLInputElement>) => string
  errors: FormErrors
  baseColor?: "primary" | "secondary"
  className?: string
  comparativeValue?: any
  autoComplete?: string
}

export default function Field({ text, autoComplete, type, defaultValue, value, readOnly = false, onChange, name, id, errors, validation, placeholder = "", min = "", max = "", inputMask, baseColor = "primary", className, comparativeValue }: IFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  
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
    <div className={`flex flex-col ${className}`}>
      <label className={`${errors[name] ? 'text-red-600' : readOnly ? 'text-gray-500' : colors[baseColor].text} font-medium relative top-3 left-4 bg-white px-2 max-w-max rounded-lg`}>{text}</label>
      <div className="w-full flex items-center">
        <input
          className={`${readOnly ? 'text-gray-500' : 'text-black'} ${type === 'password' ? 'border-l-2 border-t-2 border-b-2' : 'border-2'} ${errors[name] ? 'border-red-600' : readOnly ? 'border-gray-500' : colors[baseColor].border} ${type === 'password' ? 'rounded-ss-2xl rounded-es-2xl' : 'rounded-2xl' } p-4 focus:outline-none h-15 w-full`}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          defaultValue={defaultValue}
          readOnly={readOnly}
          min={min}
          max={max}
          onChange={(e) => {
            onChange?.(e, inputMask?.(e) ?? null)
            validation?.(errors, e.target.value, comparativeValue)
          }}
          name={name}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {type === "password" && (
          <div className={`h-15 py-4 pr-4 border-t-2 border-r-2 border-b-2 rounded-ee-2xl rounded-se-2xl ${errors[name] ? 'border-red-600' : readOnly ? 'border-gray-500' : colors[baseColor].border} cursor-pointer`} onClick={() => setShowPassword((prevState) => !prevState)}>
            {showPassword ? <EyeSlashIcon className="text-tuna"/> : <EyeIcon className="text-tuna" />}
          </div>
        )}
      </div>
      {errors[name] && <p className="text-red-600 pt-2"><ErrorIcon className="inline" /> {errors[name]}</p>}
    </div>
  )
}