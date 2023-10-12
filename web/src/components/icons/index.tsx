import { ChevronLeftIcon } from './types/chevron-left'
import { ChevronRightIcon } from './types/chevron-right'
import { SearchIcon } from './types/search-icon'

interface Props {
  size?: number | string
  type: IconType
  color?: string
  className?: string
  onClick?: () => void
}

const types = {
  search: SearchIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
} as const

export type IconType = keyof typeof types

export const Icon = ({ size = 24, type, color, className, onClick }: Props) => {
  const Component = types[type]
  if (!Component) return null
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        color,
      }}
      onClick={onClick}
    >
      {<Component />}
    </div>
  )
}
