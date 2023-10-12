import { createRoot } from 'react-dom/client'
import { App } from './app'
import './styles.css'

const container = document.getElementById('app') as HTMLDivElement
const root = createRoot(container)
root.render(<App />)
