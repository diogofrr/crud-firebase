'use client'

import { Dispatch, SetStateAction } from "react"

interface IFieldProps {
  text: string
  type: 'text' | 'number'
  value: any
  readOnly?: boolean
  onChange?: Dispatch<SetStateAction<any>>
}

export default function Field({ text, type, value, readOnly = false, onChange }: IFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-black mb-2">{text}</label>
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
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  )
}