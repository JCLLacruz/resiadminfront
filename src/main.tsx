import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '../custom.scss';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</Provider>
);
