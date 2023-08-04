'use client'

interface IFieldProps {
  text: string
  type: 'text' | 'number'
  value: any
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, validation?: () => void) => void
  name: string
  id: string
  errors: {
    [key: string]: string;
  }
  validation?: (value: any) => void
}

export default function Field({ text, type, value, readOnly = false, onChange, name, id, errors, validation }: IFieldProps) {
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
        readOnly={readOnly}
        onChange={(e) => {
          onChange?.(e)
          validation?.(e.target.value)
        }}
        name={name}
        id={id}
      />
      {errors[name] && <p className="text-red-600">{errors[name]}</p>}
    </div>
  )
}