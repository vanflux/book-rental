import { ReactNode, useEffect } from 'react'
import ReactModal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: '#00000044',
  },
}

ReactModal.setAppElement('#app')

interface Props {
  open: boolean
  onAfterOpen?: () => void
  onOpenChange: (open: boolean) => void
  children?: ReactNode
}

export function Modal({ open, onAfterOpen, onOpenChange, children }: Props) {
  useEffect(() => {
    if (document) {
      document.body.style.overflow = open ? 'hidden' : 'auto'
    }
  }, [open])

  return (
    <ReactModal isOpen={open} onAfterOpen={onAfterOpen} onRequestClose={() => onOpenChange(false)} style={customStyles}>
      {children}
    </ReactModal>
  )
}
