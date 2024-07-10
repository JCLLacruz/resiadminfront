import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../custom.scss'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
)
