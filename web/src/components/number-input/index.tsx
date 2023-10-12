import { useEffect, useState } from 'react'
import { TextInput } from '../text-input'
import styles from './styles.module.css'

interface Props {
  value?: number
  onChange?: (value?: number) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password'
  full?: boolean
  errorMessage?: string
}

export function NumberInput({ value, onChange, ...rest }: Props) {
  const [internalValue, setInternalValue] = useState<string | undefined>(value ? String(value) : undefined)

  useEffect(() => {
    setInternalValue(value ? String(value) : undefined)
  }, [value])

  const handleChange = (value?: string) => {
    if (value?.trim() == '') {
      setInternalValue('')
      onChange?.()
    } else {
      const num = parseInt(value ?? '')
      if (isNaN(num)) {
        setInternalValue(value)
      } else {
        onChange?.(num)
        setInternalValue(String(value))
      }
    }
  }

  return <TextInput value={internalValue} onChange={handleChange} {...rest} />
}
