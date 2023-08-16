'use client'

interface IFieldProps {
  text: string
  type: 'text' | 'number' | 'date' | 'tel' | 'email'
  value?: any
  readOnly?: boolean
  onChange?: (e: React.FormEvent<HTMLInputElement>, validation?: () => void) => void
  name: string
  id: string
  min?: string
  max?: string
  errors: {
    [key: string]: string;
  }
  placeholder?: string
  validation?: (value: any) => void
  defaultValue?: any
}

export default function Field({ text, type, defaultValue, value, readOnly = false, onChange, name, id, errors, validation, placeholder = "", min = "", max = "" }: IFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-black mb-1 font-semibold">{text}</label>
      <input
        className={`
          text-black
          border-2 border-black rounded-md
          px-3 py-3
          focus:outline-none
          ${readOnly ? '' : 'focus:bg-white'}
          bg-gray-50
        `}
        type={type}
        value={value}
        defaultValue={defaultValue}
        readOnly={readOnly}
        min={min}
        max={max}
        onChange={(e) => {
          onChange?.(e)
          validation?.(e.target.value)
        }}
        name={name}
        id={id}
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-600">{errors[name]}</p>}
    </div>
  )
}