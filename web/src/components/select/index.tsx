import NormalSelect from 'react-select'
import CreatableSelect from 'react-select/creatable'
import styles from './styles.module.css'

interface Option {
  value: string
  label: string
}

interface Props {
  value?: Option | Option[]
  multi?: boolean
  creatable?: boolean
  placeholder?: string
  errorMessage?: string
  options: Option[]
  onChange?: (values?: Option[]) => void
}

export function Select({ value, multi, creatable, placeholder, errorMessage, options, onChange }: Props) {
  const Component = creatable ? CreatableSelect : NormalSelect
  return (
    <div className={styles.container}>
      <Component
        menuPortalTarget={document.body}
        value={value}
        isMulti={multi}
        options={options}
        placeholder={placeholder}
        onChange={(e) => {
          if (multi) {
            onChange?.(e as Option[])
          } else {
            onChange?.([e as Option])
          }
        }}
      />
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  )
}
